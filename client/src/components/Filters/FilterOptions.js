import React from 'react';
import styled from 'styled-components';
import possibleAttributes from '../../contextPossibleVals.json';
import { deJSONizeValue } from '../../utils';
import { attributeDisplay } from './FilterConfig';

const handleMultipleChoiceButtonClick = (ev, attribute) => {
    const resetButton = (button) => {
        if (button.id === attribute + '__reset') {
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
        } else if (button.id === attribute + '__reset') {
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

    if (ev.target.id === attribute + '__reset') {
        childButtons.forEach((button) => resetButton(button));
    } else {
        childButtons.forEach((button) => keepOrExclude(button));
    }
    const noneSelected = childButtons.every((button) => {
        return !button.classList.contains('selected');
    });
    const allSelected = childButtons.every((button) => {
        return (
            button.id === attribute + '__reset' ||
            button.classList.contains('selected')
        );
    });

    (noneSelected || allSelected) &&
        childButtons.forEach((button) => resetButton(button));
};

const handleRequireClick = (ev) => {
    ev.target.classList.toggle('selected');
};

export const RequireFilter = ({ attribute }) => {
    return (
        <button
            className="attribute-selection button-behaviour"
            onClick={handleRequireClick}
            id={attribute + '_selector'}
        >
            {attributeDisplay[attribute].pretty}
        </button>
    );
};

export const NumRange = ({ attribute, date }) => {
    const minInput = React.useRef(null);
    const maxInput = React.useRef(null);
    const handleChange = (ev) => {
        const minChanged = ev.target === minInput.current;
        const parser = !date
            ? parseInt
            : (someDate) => {
                  return new Date(someDate);
              };

        const [minVal, maxVal] = [
            parser(minInput.current.value),
            parser(maxInput.current.value),
        ];
        console.log(`❗ FilterOptions.js:101 '[minVal,maxVal]'`, [
            minVal,
            maxVal,
        ]);

        const isIncoherent = date
            ? ![minVal, maxVal].includes('Invalid Date') &&
              minVal.valueOf() > maxVal.valueOf()
            : ![minVal, maxVal].includes(NaN) && minVal > maxVal;
        console.log(
            `❗ FilterOptions.js:117 '[attribute,minVal,maxVal,isIncoherent]'`,
            [attribute, minVal, maxVal, isIncoherent]
        );
        if (!isIncoherent) {
            return;
        }

        if (minChanged) {
            maxInput.current.value = ev.target.value;
        } else {
            minInput.current.value = ev.target.value;
        }
    };

    const inputType = date ? 'date' : 'number';
    return (
        <Options>
            <div>
                <label for={attribute}>From:</label>
                <RangeInput
                    type={inputType}
                    name={attribute}
                    id={attribute + '_min'}
                    date={date}
                    ref={minInput}
                    onBlur={handleChange}
                />
            </div>
            <div>
                <label for={attribute}>To:</label>
                <RangeInput
                    type={inputType}
                    name={attribute}
                    id={attribute + '_max'}
                    date={date}
                    ref={maxInput}
                    onBlur={handleChange}
                />
            </div>
        </Options>
    );
};

export const MultipleChoice = ({ attribute }) => {
    const cleanPossibleValues = possibleAttributes[attribute]
        .map((value) => {
            return {
                raw: value,
                pretty:
                    attributeDisplay[attribute].prettyValues[value] ||
                    deJSONizeValue(value),
            };
        })
        .sort();

    return (
        <Options id={attribute + '_options'}>
            <button
                onClick={(ev) => handleMultipleChoiceButtonClick(ev, attribute)}
                id={attribute + '__reset'}
                className="attribute-selection button-behaviour selected"
            >
                No Preference
            </button>
            {cleanPossibleValues
                .sort((attr1, attr2) => attr1.pretty > attr2.pretty ? 1 : -1 )
                .map((value) => {
                    return (
                        <button
                            id={attribute + '__' + value.raw}
                            className="button-behaviour attribute-selection"
                            onClick={(ev) =>
                                handleMultipleChoiceButtonClick(ev, attribute)
                            }
                        >
                            {value.pretty}
                        </button>
                    );
                })}
        </Options>
    );
};

export const Filter = ({ attribute }) => {
    const InnerComponentDictionary = {
        require: RequireFilter,
        multiple_choice: MultipleChoice,
        range: NumRange,
        daterange: NumRange,
    };
    const filterType = attributeDisplay[attribute].filterType;
    if (!['multiple_choice', 'range', 'daterange'].includes(filterType)) {
        return null;
    }

    const props = { attribute: attribute, date: filterType === 'daterange' };

    const InnerInputElement = InnerComponentDictionary[filterType];
    return (
        <Wrapper
            id={attribute + '_single_container'}
            className="rounded-container-with-label"
        >
            <span className="filter-name">
                {attributeDisplay[attribute].pretty}
            </span>
            <InnerInputElement {...props}></InnerInputElement>
        </Wrapper>
    );
};

export const GroupedRequireFilter = ({ attributes, group }) => {
    if (!attributes.length) {
        return null;
    }
    return (
        <Wrapper
            id={group + '_requires_container'}
            className="rounded-container-with-label"
        >
            <span className="filter-name">Require these attributes</span>
            {attributes.map((attribute) => (
                <RequireFilter attribute={attribute} />
            ))}
        </Wrapper>
    );
};

const RangeInput = styled.input`
    width: ${(props) => (props.date ? '140px' : '60px')};
    padding: 4px;
    height: 1em;
    border-radius: 5px;
    margin: 2px 10px 2px 5px;
    font-family: var(--karla);
`;

const Options = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    &.center-children {
        justify-content: center;
    }
    & label {
        min-width: 40px;
    }
    /* &>input {
  appearance:none;
} */
`;

const Wrapper = styled.div`
    /* display: flex;
    border: 1px var(--white-500) solid;
    border-radius: 5px;
    position: relative;
    padding: 12px;
    margin: 20px 0;
    width: calc(100% - 30px);
    flex-wrap: wrap;

    & .filter-name {
        position: absolute;
        top: -12px;
        background-color: var(--blackWhiteLight);
        padding: 0 3px;
    }
    & .attribute-selection {
        color: var(--white);
        border: 1px var(--white-500) solid;
        transition: all 0.1s ease-out;
        border-radius: 3px;
        margin: 3px;
        background-color: rgba(0, 0, 0, 0);
        font-family: var(--karla);
        padding: 3px 6px;
        min-width: 28px;
    }
    & .attribute-selection:hover {
        background-color: var(--whiteLight);
        box-shadow:0 0 4px 2px var(--white);
    }
    & .attribute-selection.selected {
        background-color: var(--green-500);
        color: var(--black);
    }
    & .attribute-selection.excluded {
        background-color: var(--red-500);
        color: var(--black);
    } */
`;
