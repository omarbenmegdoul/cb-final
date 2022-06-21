const express = require('express');
const morgan = require('morgan');
const { initMongoClient, db } = require('./db');
initMongoClient();
const { constructRequestFromFilterSummary } = require('./handlers');
const cors = require('cors');
const util = require('util');
const PORT = 5678;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use(require("./routes"));

app.post('/listings', async (req, res) => {
    const body = req.body;
    console.log(`❗ index.js:16 'body'`, body);
    const mongoDBFilter = constructRequestFromFilterSummary(body.filterSummary);
    console.log(
        `❗ index.js:18 'mongoDBFilter'`,
        util.inspect(mongoDBFilter, false, null, true /* enable colors */)
    );
    const listings = await db()
        .collection('listings_rolling_update')
        .find({ ...mongoDBFilter })
        .toArray();
    // listings.slice(0, 5).forEach((l) => {
    //     console.log(`❗ index.js:20 'l'`, l);
    // });
    // console.log(`❗ index.js:15 'out'`,out);
    // res.status(200).json(listings)
    res.status(200).json(JSON.stringify({ data: listings }));
});

app.post('/dict', async (req, res) => {
    const body = req.body;
    Object.keys(body).forEach(
        async (k) =>
            await db()
                .collection('subdivisions_to_coordinates')
                .insertOne({ [k]: body[k] })
    );
    res.status(200).end();
});
app.get('/subdivisions', async (req, res) => {
    const subdivisionData = await db()
        .collection('listings_by_subdivision')
        .find({})
        .toArray();
    res.status(200).json(JSON.stringify({ data: subdivisionData }));
});
app.post('/data', async (req, res) => {
    //this request will be sent from the Python script that scrapes
    const body = req.body;
    //this step should eventually be done scraper-side
    const cleanedData = Object.keys(body).reduce((accumulator, k) => {
        const kijijiAddressSplit = k.split('/');
        const kijijiID = kijijiAddressSplit[kijijiAddressSplit.length - 1];
        accumulator[kijijiID] = body[k];
        return accumulator;
    }, {});
    console.log(Object.keys(cleanedData));

    // for (const listing in cleanedData) {
    //     console.log(`❗ importDataToMongoDB.js:37 'x'`, listing);
    //     const flattenedContext = Object.keys(cleanedData[listing].cntxt)
    //         .filter((attr) => !['d', 'd1', 'd2', 'd3'].includes(attr))
    //         .reduce(
    //             (accum, attr) => {
    //                 accum[attr] = cleanedData[listing].cntxt[attr];
    //                 return accum;
    //             },
    //             { ...cleanedData[listing].cntxt.d }
    //         );

    //     await db.collection('listings_rolling_update').insertOne(flattenedContext);
    //     // }
    // }

    const dataToInsert = Object.entries(cleanedData).map(([key, value]) =>
        Object.keys(value.cntxt)
            .filter((attr) => !['d', 'd1', 'd2', 'd3'].includes(attr))
            .reduce(
                (accum, attr) => {
                    accum[attr] = value.cntxt[attr];
                    return accum;
                },
                { ...value.cntxt.d, _id: key }
            )
    );
    await db()
        .collection('listings_rolling_update')
        .insertMany(dataToInsert, { ordered: false })
        .catch((err) => {
            console.error(err);
        });
    // close the connection to the database server
    res.end();
});
app.post('/keptAndTrimmedListings', async (req, res) => {
    const ids = req.body.ids;
    console.log(`❗ index.js:99 'ids.slice(0,30)'`, ids.slice(0, 30));

    await db()
        .collection('kept_and_discarded_listing_ids')
        .insertMany(
            ids.map((url) => {
                const urlSplit = url.split('/');
                return { _id: urlSplit[urlSplit.length - 1] };
            }),
            { ordered: false }
        )
        .catch((err) => {
            console.error(err);
        });
    // close the connection to the database server
    res.end();
});
app.patch('/data/:id/whitelist', async (req, res) => {
    const result = await db()
        .collection('listings_rolling_update')
        .updateOne({ id: req.params.id }, { $set: { hidden: req.body.value } })
        .catch((err) => {
            console.error(err);
        });
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    // close the connection to the database server
    // close the connection to the database server
    res.end();
});

app.patch('/data/:id/blacklist', async (req, res) => {
    const result = await db()
        .collection('listings_rolling_update')
        .updateOne({ id: req.params.id }, { $set: { hidden: req.body.value } })
        .catch((err) => {
            console.error(err);
        });
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    // close the connection to the database server
    // close the connection to the database server
    res.end();
});
app.get('/user/:username', async (req, res) => {
    const query = { username: req.params.username };
    const result = await db()
        .collection('users')
        .findOneAndUpdate(
            query,
            {
                $setOnInsert: { ...query, blacklist: [], whitelist: [] },
            },
            { upsert: true } // insert the document if it does not exist
        );
    res.json(JSON.stringify({ result }));
});

app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Kijiji machine broke',
    });
});

const server = app.listen(PORT, function () {
    console.info('🌍 Listening on port ' + server.address().port);
});
