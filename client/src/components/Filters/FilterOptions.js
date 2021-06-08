import React from 'react';
import styled from 'styled-components';
import {
    attributeDisplay,
    keyGroupings,
    niceKeyGroupings,
} from './FilterConfig';
import possibleAttributes from '../../contextPossibleVals.json';
import { deJSONizeValue } from '../../utils';

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

export const RequireFilter = ({ attribute }) => {
    return (
        <Options>
            <label for={attribute}>Require</label>
            <input type="checkbox" name={attribute} id={attribute}></input>
        </Options>
    );
};

export const Radio = ({ attribute }) => {
    <Options>
        <label for={attribute}>Any {attributeDisplay[attribute].pretty}</label>
        <input type="radio" name={attribute} id={attribute + '-ignore'}></input>
        <label for={attribute}>Require """"</label>
        <input type="radio" name={attribute} id={attribute + ''}></input>
        <label for={attribute}>Require """"</label>
        <input type="radio" name={attribute} id={attribute + ''}></input>
    </Options>;
};

export const NumRange = ({ attribute, date }) => {
    <Options>
        <label for={attribute}>
            {attributeDisplay[attribute].pretty} minimum
        </label>
        <input
            type={date ? 'date' : 'number'}
            name={attribute}
            id={attribute + '-min'}
        ></input>
        <label for={attribute}>
            {attributeDisplay[attribute].pretty} maximum
        </label>
        <input type="number" name={attribute} id={attribute + '-max'}></input>
    </Options>;
};



export const MultipleChoice = ({ attribute }) => {
    const cleanPossibleValues = possibleAttributes[attribute]
        .map(
            (value) =>
                attributeDisplay[attribute].prettyValues[value] ||
                deJSONizeValue(value)
        )
        .sort();

    return (
        <Options id={attribute + '_options'}>
            <button
                onClick={(ev) => handleButtonClick(ev, attribute)}
                id={attribute + '_reset'}
                className="selected"
            >
                No Preference
            </button>
            {cleanPossibleValues.map((handledValue) => {
                return (
                    <button onClick={(ev) => handleButtonClick(ev, attribute)}>
                        {handledValue}
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
    };
    const filterType = attributeDisplay[attribute].filterType;
    if (!['multiple_choice'].includes(filterType)) {
        return null;
    }
    console.log(
        `❗ Filters.js:52 'filterType' <${typeof filterType}>`,
        filterType
    );
    const InnerInputElement = InnerComponentDictionary[filterType];

    return (
        <Wrapper>
            <span class="filter-name">
                {attributeDisplay[attribute].pretty}
            </span>
            <InnerInputElement attribute={attribute}></InnerInputElement>
        </Wrapper>
    );
};

const Options = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* &>input {
  appearance:none;
} */
`;

const Wrapper = styled.div`
    display: flex;
    border: 1px var(--white-500) solid;
    border-radius: 5px;
    position: relative;
    padding: 10px;
    margin: 5px;
    width: 100%;

    & .filter-name {
        position: absolute;
        top: -10px;
        background-color: var(--blackPurple);
        padding: 0 3px;
    }
    & button {
        color: var(--white);
        border: 1px var(--white-500) solid;
        transition: all 0.1s ease-in-out;
        border-radius: 3px;
        margin: 3px;
        background-color: rgba(0, 0, 0, 0);
        font-family: var(--karla);
        padding: 3px 6px;
        min-width: 28px;
    }
    & button:hover {
        background-color: var(--whiteLight);
    }
    & button.selected {
        background-color: var(--green-500);
        color: var(--black);
    }
    & button.excluded {
        background-color: var(--red-500);
        color: var(--black);
    }
`;
