const { MongoClient } = require('mongodb');
require('dotenv').config();
const simpleData = require('./simpleData.json');
// console.log(`❗ importDataToMongoDB.js:4 'simpleData'`,simpleData);
const { MONGO_URI } = process.env;
const {toLonLat} = require('ol/proj')
throw new Error()
const { CHI_SUBDIVISIONS, PSI_SUBDIVISIONS } = require('./constants');
const { subdivisionCenterFromChiPsiCoords } = require('../client/src/utils');
// const  = require('./constants').PSI_SUBDIVISIONS;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// throw new Error();
const getListingData = async (dbName) => {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log('connected!');

    const listings = await db
        .collection('listings_rolling_update')
        .find({})
        .toArray();

    // }

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
    return listings;
};

const attributeDictionaryImport = async (dbName) => {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // Object.keys(simpleData).forEach((x) =>
    //     console.log(`❗ importDataToMongoDB.js:20 'x.split("/")'`, x.split('/'))
    // );
    const db = client.db(dbName);
    // await db.collection('consts').insertMany([
    //     { _id: 'attributeDisplay', ...attributeDisplay },
    //     { _id: 'keyGroupings', ...keyGroupings },
    //     { _id: 'prettyKeyGroupings', ...prettyKeyGroupings },
    // ]);
    for (const x in attributeDisplay) {
        const flattenedContext = Object.keys(cleanedSimpleData[x].cntxt)
            .filter((attr) => !['d', 'd1', 'd2', 'd3'].includes(x))
            .reduce(
                (accum, attr) => {
                    accum[attr] = cleanedSimpleData[x].cntxt[attr];
                    return accum;
                },
                { ...cleanedSimpleData[x].cntxt.d }
            );

        await db.collection('listings_rolling_update').insertOne(flattenedContext);
    }

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
};

const rows = new Array(PSI_SUBDIVISIONS).fill(0);
const columns = new Array(CHI_SUBDIVISIONS).fill(0);

const coordsToChiPsiDict = rows.reduce((accumx, x, xIndex) => {
    const newEntries = columns.reduce((accumy, y, yIndex) => {
        const coords = subdivisionCenterFromChiPsiCoords(xIndex, yIndex);
        return {
            ...accumy,
            [`${coords[0]}-${coords[1]}`]: `${xIndex}-${yIndex}`,
        };
        // <div
        //     id={`${xIndex}-${yIndex}`}
        //     className="grid-slots"
        //     onMouseEnter={markHover}
        // />
    }, {});
    return { ...accumx, ...newEntries };
}, {});

console.log(
    `❗ testCoordsToChiPsi.js:93 'coordsToChiPsiDict'`,
    coordsToChiPsiDict
);
const listings = getListingData('final_project');

listings.slice(0, 20).forEach((l) => {
    const [lon, lat] = [l.map.longitude, l.map.latitude];
    const distances = Object.keys(coordsToChiPsiDict).reduce((accum,coords) => {

    }, {});
    console.log(l.title, lon, lat);
});

console.log(`❗ testCoordsToChiPsi.js:27 '[listings,listings.length]'`, [
    listings,
    listings.length,
]);

// attributeDictionaryImport('final_project');
module.exports = { attributeDisplay, keyGroupings, prettyKeyGroupings };
