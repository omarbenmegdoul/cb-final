const { attributeDisplay } = require('./filterConfig');

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
                    $lte: (
                        (attribute === 'prc' ? 100 : 1) *
                        rangeSummary[attribute + '_max']
                    ).toString(),
                },
            }
          : {};
      const lowerBoundCheck = rangeSummary[attribute + '_min']
          ? {
                [attribute]: {
                    $gte: (
                        (attribute === 'prc' ? 100 : 1) *
                        rangeSummary[attribute + '_min']
                    ).toString(),
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
          : //todo: try $gt naively with strings and see if it works, preferably with a log so we can see
            //doesn't work: reupload data with ranges converted to ints

            {};
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

  return mongoFilters.length? { $and: mongoFilters }:{};
};

module.exports = {constructRequestFromFilterSummary}