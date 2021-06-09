import React from 'react';
import styled from 'styled-components';
import {
    attributeDisplay,
    keyGroupings,
    prettyKeyGroupings,
} from './FilterConfig';
import possibleAttributes from '../../contextPossibleVals.json';
import { Filter, GroupedRequireFilter } from './FilterOptions';

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
    // console.log(`❗ Filters.js:67 'ev.target' <${typeof ev.target}>`,ev.target);
    // console.log(`❗ Filters.js:68 'ev.target.nodeName' <${typeof ev.target.nodeName}>`,ev.target.nodeName);
    //   const splitId = !ev.target.nodeName==="SPAN" ?
    //   ev.target.id.split('_') :
    //   // ev.target.parentElement.id.split('_');
    //   "";
    //   console.log(`❗ Filters.js:71 'splitId' <${typeof splitId}>`,splitId);

    const splitId = ev.currentTarget.id.split('_')
    const optionsId = `${splitId.slice(0, splitId.length-1).join("_")}_options`;
    const filterContainer = document.getElementById(optionsId);
    console.log(`❗ Filters.js:78 'ev.currentTarget' <${typeof ev.currentTarget}>`,ev.currentTarget);
    console.log(`❗ Filters.js:79 'optionsId' <${typeof optionsId}>`,optionsId);
    console.log(`❗ Filters.js:80 'filterContainer' <${typeof filterContainer}>`,filterContainer);
    const currentDisplay = filterContainer.style.display;

    filterContainer.style.display = ["","none"].includes(currentDisplay) ? 'flex' : 'none';
    ev.currentTarget.classList.toggle('sibling-is-expanded');
};

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
                <span>{prettyKeyGroupings[group]}</span>
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
    const groups = Object.keys(keyGroupings);
    return (
        <Wrapper>
            {groups.map((group) => {
                return <FilterGroup group={group} />;
            })}
        </Wrapper>
    );
};

// const Grouping = (group) => {
//   const requires = group.
//   {groups.map((group) => {
//     return <FilterGroup group={group} />;
// })}
// }

const Wrapper = styled.div`
width:100%;
overflow-y:auto;
max-height:100%;`
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
        font-size:14px;
        width: 19px;
        height: 19px;
        border: var(--white-500) 1px solid;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:0;
        margin:0;
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
