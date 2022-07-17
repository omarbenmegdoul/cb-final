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
    // console.log(`❗ index.js:16 'body'`, body);
    const mongoDBFilter = constructRequestFromFilterSummary(body.filterSummary);
    console.log(
        `❗ index.js:18 'mongoDBFilter'`,
        util.inspect(mongoDBFilter, false, null, true /* enable colors */)
    );

    const listingsPromise = db()
        .collection('listings_rolling_update')
        .find({ ...mongoDBFilter })
        .toArray();
    const subDPromise = db()
        .collection('listings_by_subdivision')
        .find({})
        .toArray();
    const [listings, subD] = await Promise.all([listingsPromise, subDPromise]);
    const allowedListings = subD.reduce((accum, x) => {
        return [...accum, ...x.listings];
    }, []);
    const results = listings.filter((x) => allowedListings.includes(x.id));

    res.status(200).json(JSON.stringify({ data: results }));
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

const filterListHandlerFactory = (list, verb) => {
    return async (req, res) => {
        const result = await db()
            .collection(list)
            .findOneAndUpdate(
                { id: req.params.username },
                { ['$' + verb]: { items: req.params.id } },
                { upsert: true, returnDocument: 'after' }
            )
            .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
        console.log(
            '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>server>index.js:134 " result"',
            result
        );
        res.status(200).json({ ...result.value.items });
    };
};

['whitelists', 'blacklists'].forEach((list) => {
    ['push', 'pull'].forEach((verb) =>
        app.patch(
            `/data/:username/${list}/:id/${verb}`,
            filterListHandlerFactory(list, verb)
        )
    );
});

app.get('/user/:username', async (req, res) => {
    const promises = ['whitelists', 'blacklists'].map((list) =>
        db()
            .collection(list)
            .findOneAndUpdate(
                { id: req.params.username },
                { $setOnInsert: { items: [] } },
                { upsert: true, returnDocument: 'after' }
            )
    );

    const [whitelist, blacklist] = await Promise.all(promises);
    res.json(
        JSON.stringify({
            whitelists: whitelist.value.items,
            blacklists: blacklist.value.items,
        })
    );
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
