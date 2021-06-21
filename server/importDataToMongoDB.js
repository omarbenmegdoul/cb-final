const { MongoClient } = require('mongodb');
require('dotenv').config();
const simpleData = require('./simpleData.json');
const { MONGO_URI } = process.env;
const GeographicLib = require('geographiclib');

const distance = (lonlat1, lonlat2) => {
    return GeographicLib.Geodesic.WGS84.Inverse(
        lonlat1[1],
        lonlat1[0],
        lonlat2[1],
        lonlat2[0]
    ).s12;
};

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const attributeDisplay = {
    accessiblewashroomsinsuite_s: {
        pretty: 'Accessible washroom in unit',
        filterType: 'require',
    },
    agreementtype_s: {
        pretty: 'Lease Agreement',
        filterType: 'multiple_choice',
        prettyValues: {
            '"one-year"': 'One year',
            '"month-to-month"': 'Month-to-month',
        },
    },
    airconditioning_s: {
        pretty: 'A/C',
        filterType: 'require',
        prettyValues: {},
    },
    areainfeet_i: { pretty: 'Area', filterType: 'range', prettyValues: {} },
    audioprompts_s: {
        pretty: 'Audio Prompts',
        filterType: 'require',
        prettyValues: {},
    },
    balcony_s: { pretty: 'Balcony', filterType: 'require', prettyValues: {} },
    barrierfreeentrancesandramps_s: {
        pretty: 'Barrier-free Entrance & Ramps',
        filterType: 'require',
    },
    bicycleparking_s: {
        pretty: 'Bicycle Parking',
        filterType: 'require',
        prettyValues: {},
    },
    braillelabels_s: {
        pretty: 'Braille Labels',
        filterType: 'require',
        prettyValues: {},
    },
    cabletv_s: { pretty: 'Cable TV', filterType: 'require', prettyValues: {} },
    concierge_s: {
        pretty: 'Concierge',
        filterType: 'require',
        prettyValues: {},
    },
    dateavailable_tdt: {
        pretty: 'Date Available',
        filterType: 'daterange',
        prettyValues: {},
    },
    dishwasher_s: {
        pretty: 'Dishwasher',
        filterType: 'require',
        prettyValues: {},
    },
    elevator_s: { pretty: 'Elevator', filterType: 'require', prettyValues: {} },
    forrentbyhousing_s: {
        pretty: 'Leased By',
        filterType: 'multiple_choice',
        prettyValues: {
            '"reprofessional"': 'Real-estate Professional',
            '"ownr"': 'Owner',
        },
    },
    fridgefreezer_s: {
        pretty: 'Fridge & Freezer',
        filterType: 'require',
        prettyValues: {},
    },
    furnished_s: {
        pretty: 'Furnished',
        filterType: 'require',
        prettyValues: {},
    },
    gym_s: { pretty: 'Gym', filterType: 'require', prettyValues: {} },
    heat_s: {
        pretty: 'Heat Included',
        filterType: 'require',
        prettyValues: {},
    },
    hydro_s: {
        pretty: 'Hydro Included',
        filterType: 'require',
        prettyValues: {},
    },
    internet_s: {
        pretty: 'Internet Included',
        filterType: 'require',
        prettyValues: {},
    },
    laundryinbuilding_s: {
        pretty: 'Laundry room',
        filterType: 'require',
        prettyValues: {},
    },
    laundryinunit_s: {
        pretty: 'Laundry in unit',
        filterType: 'require',
        prettyValues: {},
    },
    numberbathrooms_s: {
        pretty: 'Bathrooms',
        filterType: 'multiple_choice',
        prettyValues: {
            '"45"': '4.5',
            '"25"': '2.5',
            '"30"': '3',
            '"10"': '1',
            '"15"': '1.5',
            '"40"': '4',
            '"55"': '5.5',
            '"35"': '3.5',
            '"60"': '6',
            '"20"': '2',
        },
    },
    numberbedrooms_s: {
        pretty: 'Bedrooms',
        filterType: 'multiple_choice',
        prettyValues: {
            '"0"': 'None',
        },
    },
    numberparkingspots_s: {
        pretty: 'Parking Spots',
        filterType: 'multiple_choice',
        prettyValues: {},
    },
    petsallowed_s: {
        pretty: 'Pets',
        filterType: 'multiple_choice',
        prettyValues: {
            '"0"': 'Forbidden',
            '"limited"': 'Limited',
            '"1"': 'Allowed',
        },
    },
    pool_s: { pretty: 'Pool', filterType: 'require', prettyValues: {} },
    prc: { pretty: 'Price', filterType: 'range', prettyValues: {} },
    smokingpermitted_s: {
        pretty: 'Smoking',
        filterType: 'multiple_choice',
        prettyValues: {
            '"0"': 'Forbidden',
            '"1"': 'Allowed',
            '"2"': 'Outdoors only',
        },
    },
    storagelocker_s: {
        pretty: 'Storage locker',
        filterType: 'require',
        prettyValues: {},
    },
    twentyfourhoursecurity_s: {
        pretty: '24/7 Security',
        filterType: 'require',
    },
    unittype_s: {
        pretty: 'Type',
        filterType: 'multiple_choice',
        prettyValues: {
            '"townhouse"': 'Townhouse',
            '"condo"': 'Condo',
            '"basement-apartment"': 'Basement Apartment',
            '"apartment"': 'Apartment',
            '"duplex-triplex"': 'Duplex/Triplex',
            '"house"': 'House',
        },
    },
    visualaids_s: {
        pretty: 'Visual Aids',
        filterType: 'require',
        prettyValues: {},
    },
    water_s: {
        pretty: 'Water included',
        filterType: 'require',
        prettyValues: {},
    },
    wheelchairaccessible_s: {
        pretty: 'Wheelchair Accessible',
        filterType: 'require',
    },
    yard_s: { pretty: 'Yard', filterType: 'require', prettyValues: {} },
};

const keyGroupings = {
    g_basic: [
        'prc',
        'dateavailable_tdt',
        'numberbathrooms_s',
        'numberbedrooms_s',
        'areainfeet_i',
        'unittype_s',
    ],
    g_features: [
        'dishwasher_s',
        'fridgefreezer_s',
        'laundryinbuilding_s',
        'laundryinunit_s',
        'furnished_s',
        'heat_s',
        'hydro_s',
        'water_s',
        'cabletv_s',
        'internet_s',
        'numberparkingspots_s',
        'petsallowed_s',
        'storagelocker_s',
        'yard_s',
        'balcony_s',
        'smokingpermitted_s',
    ],
    g_lease: ['agreementtype_s', 'forrentbyhousing_s'],
    g_building_features: [
        'bicycleparking_s',
        'concierge_s',
        'gym_s',
        'pool_s',

        'twentyfourhoursecurity_s',
        'elevator_s',
    ],
    g_a11y: [
        'accessiblewashroomsinsuite_s',
        'audioprompts_s',
        'barrierfreeentrancesandramps_s',
        'braillelabels_s',
        'visualaids_s',
        'wheelchairaccessible_s',
    ],
};

const prettyKeyGroupings = {
    g_basic: 'Basic filters',
    g_features: 'Unit features',
    g_building_features: 'Building features',
    g_lease: 'Lease properties',
    g_a11y: 'Accessibility',
};


const listingDataImport = async (dbName) => {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // Object.keys(simpleData).forEach((x) =>
    //     console.log(`❗ importDataToMongoDB.js:20 'x.split("/")'`, x.split('/'))
    // );

    const cleanedSimpleData = Object.keys(simpleData).reduce(
        (accumulator, k) => {
            const kijijiAddressSplit = k.split('/');
            const kijijiID = kijijiAddressSplit[kijijiAddressSplit.length - 1];
            console.log(kijijiID);
            accumulator[kijijiID] = simpleData[k];
            return accumulator;
        },
        {}
    );

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log('connected!');
    for (const listing in cleanedSimpleData) {
        console.log(`❗ importDataToMongoDB.js:37 'x'`, listing);
        // for (const attribute in attributeDisplay) {
        const flattenedContext = Object.keys(cleanedSimpleData[listing].cntxt)
            .filter((attr) => !['d', 'd1', 'd2', 'd3'].includes(attr))
            .reduce(
                (accum, attr) => {
                    accum[attr] = cleanedSimpleData[listing].cntxt[attr];
                    return accum;
                },
                { ...cleanedSimpleData[listing].cntxt.d }
            );

        await db.collection('flattened_listings').insertOne(flattenedContext);
        // }
    }

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
};

const attributeDictionaryImport = async (dbName) => {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // Object.keys(simpleData).forEach((x) =>
    //     console.log(`❗ importDataToMongoDB.js:20 'x.split("/")'`, x.split('/'))
    // );
    console.log(`❗ importDataToMongoDB.js:321 'client'`, client);

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

        await db.collection('flattened_listings').insertOne(flattenedContext);
    }

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
};

const listingsWithCoordInfoImport = async (dbName) => {
    const cleanedSimpleData = Object.keys(simpleData).reduce(
        (accumulator, k) => {
            const kijijiAddressSplit = k.split('/');
            const kijijiID = kijijiAddressSplit[kijijiAddressSplit.length - 1];
            console.log(kijijiID);
            accumulator[kijijiID] = simpleData[k];
            return accumulator;
        },
        {}
    );
    const distanceBetweenListingAndSub = (listing, subCoordsObj) => {
        const listingCoords = [
            listing.cntxt.map.latitude,
            listing.cntxt.map.longitude,
        ];

        const subCoords = Object.keys(subCoordsObj).filter(
            (x) => x !== '_id'
        )[0];

        const cleanedSubCoords = subCoords.split('X').join('.').split('~');

        return distance(listingCoords, cleanedSubCoords);
    };
    // const validSubdivisions = (listing, subCoordsDict) => {
    //     const allDistances = Object.keys.reduce((accumulator, key) => {
    //         const distance = distanceBetweenListingAndSub(listing, key);
    //         return {...accumulator, [key]:distance};
    //     }, {});
    //     return Object.keys(allDistances).reduce((incumbent, challenger) => {
    //         allDistances[incumbent]>allDistances[challenger]
    //     });
    // };
    const listingsInSubD = (subDByCoord) => {
        return Object.keys(cleanedSimpleData).filter(
            (listing) =>
                distanceBetweenListingAndSub(
                    cleanedSimpleData[listing],
                    subDByCoord
                ) < 370
        ); //todo: run tests in client/constants.js to figure out diagonal.
    };

    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    console.log(`❗ importDataToMongoDB.js:387 'client'`, client);
    // connect to the client
    await client.connect();

    // Object.keys(simpleData).forEach((x) =>
    //     console.log(`❗ importDataToMongoDB.js:20 'x.split("/")'`, x.split('/'))
    // );

    console.log('connected!');
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);

    const coords_to_subdivisions = await db
        .collection('subdivisions_to_coordinates')
        .find({})
        .toArray();

    const subdDlistings = coords_to_subdivisions.map((obj, index) => {
        // console.log(`❗ importDataToMongoDB.js:412 'x'`,x);

        const subCoords = Object.keys(obj).filter((k) => k !== '_id')[0];

        const listingsWithin = listingsInSubD(obj);
        const out = {
            _id: obj[subCoords],
            listings: listingsWithin,
        };
        // obj[subCoords] === "15-8" && console.log(obj[subCoords]);
        (obj[subCoords].indexOf('29-') + 1 ||
            obj[subCoords].indexOf('15-') + 1 ||
            (obj[subCoords].indexOf('0-') + 1 &&
                obj[subCoords].indexOf('10-') === -1 &&
                obj[subCoords].indexOf('20-') === -1)) &&
            out.listings.forEach((id) => {
                const [lon, lat] = [
                    cleanedSimpleData[id].cntxt.map.longitude,
                    cleanedSimpleData[id].cntxt.map.latitude,
                ];
                console.log(lat, ',', lon);
            });
        return out;
    });
    //TODO: write [
    // {"0-1":[bunchoflistings]}
    // ...
    // ]
    await db.collection('listings_by_subdivision').insertMany(subdDlistings);
    client.close();
    return;

    for (const listing in cleanedSimpleData) {
        console.log(`❗ importDataToMongoDB.js:37 'x'`, listing);
        // for (const attribute in attributeDisplay) {
        const flattenedContext = Object.keys(cleanedSimpleData[listing].cntxt)
            .filter((attr) => !['d', 'd1', 'd2', 'd3'].includes(attr))
            .reduce(
                (accum, attr) => {
                    accum[attr] = cleanedSimpleData[listing].cntxt[attr];
                    return accum;
                },
                { ...cleanedSimpleData[listing].cntxt.d }
            );

        await db.collection('flattened_listings').insertOne(flattenedContext);
        // }
    }

    // close the connection to the database server

    console.log('disconnected!');
};

listingsWithCoordInfoImport('final_project');

// attributeDictionaryImport('final_project');
module.exports = { attributeDisplay, keyGroupings, prettyKeyGroupings };
