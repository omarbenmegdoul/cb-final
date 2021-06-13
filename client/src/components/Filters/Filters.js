import React from 'react';
import styled from 'styled-components';
import {
    attributeDisplay,
    keyGroupings,
    prettyKeyGroupings,
} from './FilterConfig';
import possibleAttributes from '../../contextPossibleVals.json';
import { Filter, GroupedRequireFilter } from './FilterOptions';
import SearchContainer from '../SearchContainer';
import FilterContext from '../Context/FilterContext';

//submit click -> constructAllFilterSummary -> groups * constructGroupRequiresSummary -> constructRequiresSummary + non-require-attributes * constructNonRequireSummary

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
        console.log(`❗ Filters.js:63 '[upperBoundCheck,lowerBoundCheck]'`,[upperBoundCheck,lowerBoundCheck]);
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
        const filterForThisAttr = handlerDictionary[filterType](key, val)
        Object.keys(filterForThisAttr).length && accum.push(filterForThisAttr);
        return accum;
    }, []);
    return {$and:mongoFilters}
};

const handleButtonClick = (ev, attribute) => {
    const resetButton = (button) => {
        if (button.id === attribute + '_reset') {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected', 'excluded');
        }
    };

    const keepOrExclude = (button) => {
        const isSelected = button.classList.contains('selected');
        const isExcluded = button.classList.contains('excluded');
        if (button === ev.target) {
            if (!isSelected && !isExcluded) {
                button.classList.add('selected');
            } else if (isSelected || isExcluded) {
                button.classList.toggle('selected');
                button.classList.toggle('excluded');
            }
        } else if (button.id === attribute + '_reset') {
            button.classList.remove('selected');
        } else {
            button.classList.contains('selected');
            if (!button.classList.contains('selected')) {
                button.classList.add('excluded');
            }
        }
    };

    const childButtons = Array.from(
        document.getElementById(attribute + '_options').childNodes
    );
    console.log(
        `❗ Filters.js:74 'childButtons' <${typeof childButtons}>`,
        childButtons
    );
    if (ev.target.id === attribute + '_reset') {
        childButtons.forEach((button) => resetButton(button));
    } else {
        childButtons.forEach((button) => keepOrExclude(button));
    }
    const noneSelected = childButtons.every((button) => {
        return !button.classList.contains('selected');
    });
    const allSelected = childButtons.every((button) => {
        return (
            button.id === attribute + '_reset' ||
            button.classList.contains('selected')
        );
    });

    (noneSelected || allSelected) &&
        childButtons.forEach((button) => resetButton(button));
};

const handleGroupClick = (ev) => {
    const splitId = ev.currentTarget.id.split('_');
    const optionsId = `${splitId
        .slice(0, splitId.length - 1)
        .join('_')}_options`;
    const filterContainer = document.getElementById(optionsId);
    const currentDisplay = filterContainer.style.display;

    filterContainer.style.display = ['', 'none'].includes(currentDisplay)
        ? 'flex'
        : 'none';
    ev.currentTarget.classList.toggle('sibling-is-expanded');
};

const constructGroupRequiresSummary = (group) => {
    const container = document.getElementById(group + '_requires_container');
    if (!container) {
        return {};
    }
    const buttonNodes = container.getElementsByClassName('attribute-selection');

    return Array.from(buttonNodes).reduce((accumulator, node) => {
        const attribute = node.id.split('_selector')[0];
        accumulator[attribute] = node.classList.contains('selected');
        return accumulator;
    }, {});
};

const constructSingleAttributeSummary = (attribute) => {
    const getMultipleChoiceSummaryObject = () => {
        const noPreferenceButton = document.getElementById(
            attribute + '__reset'
        );

        const userHasNoPreference =
            noPreferenceButton.classList.contains('selected');
        const out = Array.from(buttonNodes).reduce(
            (accumulator, node) => {
                if (node === noPreferenceButton) {
                    accumulator.noPreference = userHasNoPreference;
                    return accumulator;
                }
                const attributeOption = node.id.replace(attribute + '__', '');
                accumulator[attributeOption] = userHasNoPreference
                    ? null
                    : node.classList.contains('selected');
                return accumulator;
            },
            { noPreference: false }
        );
        return out;
    };

    const container = document.getElementById(attribute + '_single_container');

    if (!container) {
        return;
    }
    const buttonNodes = container.getElementsByClassName('attribute-selection');

    if (buttonNodes.length) {
        return getMultipleChoiceSummaryObject();
    }

    //we know its a range
    const [minInput, maxInput] = [
        document.getElementById(attribute + '_min').value,
        document.getElementById(attribute + '_max').value,
    ];
    return {
        [attribute + '_min']: parseInt(minInput.split('-').join('')),
        [attribute + '_max']: parseInt(maxInput.split('-').join('')),
    };
};

const constructAllFilterSummary = () => {
    const groups = Object.keys(keyGroupings);

    const mergedRequireSummary = groups.reduce((accumulator, group) => {
        const groupSummary = constructGroupRequiresSummary(group);
        Object.keys(groupSummary).forEach((key) => {
            accumulator[key] = groupSummary[key];
        });
        return accumulator;
    }, {});

    return Object.keys(attributeDisplay)
        .filter(
            (attribute) => attributeDisplay[attribute].filterType !== 'require'
        )
        .reduce((accumulator, attribute) => {
            //what kidn?
            accumulator[attribute] = constructSingleAttributeSummary(attribute);
            return accumulator;
        }, mergedRequireSummary);
};

const handleSubmit = (ev) => {};

const FilterGroup = ({ group }) => {
    const requireKeys = keyGroupings[group].filter(
        (attribute) => attributeDisplay[attribute].filterType === 'require'
    );
    const notRequireKeys = keyGroupings[group].filter(
        (attribute) => attributeDisplay[attribute].filterType !== 'require'
    );
    return (
        <GroupWrapper>
            <button
                id={group + '_heading'}
                onClick={handleGroupClick}
                className=""
            >
                {/* <div style={{ position: 'relative' }}> */}
                <span>{prettyKeyGroupings[group]}</span>
                {/* </div> */}
            </button>

            <FilterContainer id={group + '_options'}>
                <GroupedRequireFilter
                    attributes={requireKeys}
                    group={group}
                ></GroupedRequireFilter>
                {notRequireKeys.map((key) => {
                    return <Filter attribute={key} />;
                })}
            </FilterContainer>
        </GroupWrapper>
    );
};

const Filters = () => {
    const { setUserFilters } = React.useContext(FilterContext);
    const groups = Object.keys(keyGroupings);
    return (
        <MetaWrapper>
            <Wrapper>
                {groups.map((group) => {
                    return <FilterGroup group={group} />;
                })}
            </Wrapper>
            {/* <SearchButton
                onClick={() => {
                    const filterSummary = constructAllFilterSummary();
                    console.log(
                    
                        JSON.stringify(constructRequestFromFilterSummary(filterSummary))
                    );
                    setUserFilters(filterSummary);
                }}
            >
                Search
            </SearchButton> */}
        </MetaWrapper>
    );
};

// const Grouping = (group) => {
//   const requires = group.
//   {groups.map((group) => {
//     return <FilterGroup group={group} />;
// })}
// }

const Wrapper = styled.div`
    width: 100%;
    overflow-y: auto;
    max-height: 100%;
`;

const MetaWrapper = styled.div`
    max-height: 100%;
    padding: 0px;
    margin: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchButton = styled.div`
    font-weight: 700;
    width: 100px;
    padding: 8px;
    border-radius: 1000px;
    background-color: var(--blackTernary);
    color: var(--black);
    &:hover {
        background-color: var(--purpleSecondary);
    }
    font-size: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: -0.05em;
    margin: 20px 0 0 0;
`;

const GroupWrapper = styled.div`
    margin: 5px 5px 0 5px;
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > button {
        font-size: 18px;
        padding: 6px 15px;
        font-family: Karla;
        color: var(--white);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 5px;
        margin: 5px 0 0 0;
        border: 1px var(--whiteLight) solid;
        position: relative;

        & span {
            display: inline-block;
        }
    }
    & > button:hover,
    button.sibling-is-expanded {
        background-color: var(--whiteLight);
        border-color: rgba(0, 0, 0, 0);
    }
    & > button.sibling-is-expanded:hover {
        background-color: var(--whiteSemiLight);
    }
    & > button.sibling-is-expanded {
        border-radius: 5px 5px 0px 0px;
    }

    & > button::after {
        content: '+';
        font-size: 14px;
        width: 19px;
        height: 19px;
        border: var(--white-500) 1px solid;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
    }

    & > button.sibling-is-expanded::after {
        content: '−';
    }
`;

const FilterContainer = styled.div`
    background-color: var(--whiteLight);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export default Filters;
