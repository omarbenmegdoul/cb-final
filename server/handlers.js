const { attributeDisplay } = require('./filterConfig');

const intAttributes = ['prc', 'dateavailable_tdt'];
const filterForInt = (attr, value) => {
    return !intAttributes.includes(attr)
        ? value
        : parseInt(value, 10) * (attr === 'prc' ? 100 : 1);
};

const constructRequestFromFilterSummary = (summary) => {
    const handleRequireType = (attribute, requireSummary) => {
        return requireSummary ? { [attribute]: '"1"' } : {};
    };
    const handleMultipleChoiceType = (attribute, multipleChoiceSummary) => {
        !multipleChoiceSummary &&
            console.log(
                `❗ Filters.js:20 '[attribute,multipleChoiceSummary]'`,
                [attribute, multipleChoiceSummary]
            );
        return multipleChoiceSummary.noPreference
            ? {}
            : {
                  [attribute]: {
                      $in: Object.keys(multipleChoiceSummary).filter(
                          (summaryKey) => multipleChoiceSummary[summaryKey]
                      ),
                  },
              };
    };
    const handleRangeType = (attribute, rangeSummary) => {
        console.log(`❗ Filters.js:36 'rangeSummary'`, rangeSummary);
        const attr_max = rangeSummary[attribute + '_max'];
        const attr_min = rangeSummary[attribute + '_min'];
        console.log(`❗ Filters.js:39 '[attr_max,attr_min]'`, [
            attr_max,
            attr_min,
        ]);
        const upperBoundCheck = rangeSummary[attribute + '_max']
            ? {
                  [attribute]: {
                      $lte: filterForInt(
                          attribute,
                          rangeSummary[attribute + '_max'].toString()
                      ),
                  },
              }
            : {};
        const lowerBoundCheck = rangeSummary[attribute + '_min']
            ? {
                  [attribute]: {
                      $gte: filterForInt(
                          attribute,
                          rangeSummary[attribute + '_min'].toString()
                      ),
                  },
              }
            : {};
        console.log(`❗ Filters.js:63 '[upperBoundCheck,lowerBoundCheck]'`, [
            upperBoundCheck,
            lowerBoundCheck,
        ]);
        return Object.values(rangeSummary).some(
            (intervalBound) => !!intervalBound
        )
            ? {
                  $and: [{ ...lowerBoundCheck }, { ...upperBoundCheck }],
              }
            : {};
    };

    const mongoFilters = Object.entries(summary).reduce((accum, itemPair) => {
        const [key, val] = [...itemPair];
        const filterType = attributeDisplay[key].filterType;
        const handlerDictionary = {
            require: handleRequireType,
            daterange: handleRangeType,
            range: handleRangeType,
            multiple_choice: handleMultipleChoiceType,
        };
        const filterForThisAttr = handlerDictionary[filterType](key, val);
        Object.keys(filterForThisAttr).length && accum.push(filterForThisAttr);
        return accum;
    }, []);

    return mongoFilters.length ? { $and: mongoFilters } : {};
};

module.exports = { constructRequestFromFilterSummary };
