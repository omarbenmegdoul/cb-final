const { MongoClient } = require('mongodb');
require('dotenv').config();
const simpleData = require('./simpleData.json');
// console.log(`❗ importDataToMongoDB.js:4 'simpleData'`,simpleData);
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// throw new Error();
const dbFunction = async (dbName) => {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // Object.keys(simpleData).forEach((x) =>
    //     console.log(`❗ importDataToMongoDB.js:20 'x.split("/")'`, x.split('/'))
    // );

    const cleanedSimpleData = Object.keys(simpleData).reduce((accumulator,k) => {

        const kijijiAddressSplit = k.split('/');
        const kijijiID = kijijiAddressSplit[kijijiAddressSplit.length-1];
        console.log(kijijiID);
        accumulator[kijijiID] = simpleData[k];
        return accumulator;
    }, {});

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log('connected!');
    await db.collection('listings').insertOne(cleanedSimpleData);

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
};

dbFunction('final_project');
