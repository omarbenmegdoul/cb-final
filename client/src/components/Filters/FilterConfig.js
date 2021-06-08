export const attributeDisplay = {
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
        filterType: 'range',
        prettyValues: {},
    },
    petsallowed_s: {
        pretty: 'Pets',
        filterType: 'multiple_choice',
        prettyValues: {
            '"limited"': 'Limited',
        },
    },
    pool_s: { pretty: 'Pool', filterType: 'require', prettyValues: {} },
    prc: { pretty: 'Price', filterType: 'range', prettyValues: {} },
    smokingpermitted_s: {
        pretty: 'Smoking',
        filterType: 'multiple_choice',
        prettyValues: {
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

export const keyGroupings = {
    g_basic: [
        'prc',
        'dateavailable_tdt',
        'numberbathrooms_s',
        'numberbedrooms_s',
        'areainfeet_i',
        'unittype_s',
        'balcony_s',
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
    ],
    g_lease: ['agreementtype_s', 'forrentbyhousing_s'],
    g_building_features: [
        'bicycleparking_s',
        'concierge_s',
        'gym_s',
        'pool_s',
        'smokingpermitted_s',
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

export const prettyKeyGroupings = {
    g_basic: 'Basic filters',
    g_features: 'Unit features',
    g_building_features: 'Building features',
    g_lease: 'Lease properties',
    g_a11y: 'Accessibility',
};

export const prettyVals = {};
