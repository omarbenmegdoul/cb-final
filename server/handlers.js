const { attributeDisplay } = require('./importDataToMongoDB');

const constructRequestFromFilterSummary = (summary) => {
    const handleRequireType = (attribute, requireSummary) => {
        return requireSummary ? { [attribute]: '"1"' } : {};
    };
    const handleMultipleChoiceType = (attribute, multipleChoiceSummary) => {
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
        const upperBoundCheck = rangeSummary[attribute + '_max']
            ? {
                  [attribute]: {
                      $lte: rangeSummary[attribute + '_max'].toString(),
                  },
              }
            : {};
        const lowerBoundCheck = rangeSummary[attribute + '_min']
            ? {
                  [attribute]: {
                      $gte: rangeSummary[attribute + '_min'].toString(),
                  },
              }
            : {};

        return Object.values(rangeSummary).some(
            (intervalBound) => !!intervalBound
        )
            ? {
                  $and: [{ ...lowerBoundCheck }, { ...upperBoundCheck }],
              }
            : //todo: try $gt naively with strings and see if it works, preferably with a log so we can see
              //doesn't work: reupload data with ranges converted to ints

              {};
    };

    return Object.entries(summary).reduce((accum, itemPair) => {
        const [key, val] = [...itemPair];
        const filterType = attributeDisplay[key].filterType;
        const handlerDictionary = {
            require: handleRequireType,
            daterange: handleRangeType,
            range: handleRangeType,
            multiple_choice: handleMultipleChoiceType,
        };
        accum[key] = handlerDictionary[filterType](val);
        return accum;
    }, {});
};
