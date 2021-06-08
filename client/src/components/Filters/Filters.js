import React from 'react';
import styled from 'styled-components';
import {
  attributeDisplay,
  keyGroupings,
  niceKeyGroupings,
} from './FilterConfig';
import possibleAttributes from '../../contextPossibleVals.json';
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


const FilterGroup = ({group}) => {
  <GroupWrapper></GroupWrapper>

}

const Filters = () => {return (
<Wrapper>
  {Object.keys(attributeDisplay).map((key) => {
                      return <FilterComp attribute={key} />;
                  })}
</Wrapper>)
};
const Wrapper = styled.div``;
const GroupWrapper = styled.div``;

export default Filters;