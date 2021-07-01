import React from 'react';
import styled from 'styled-components';
import FilterContext from './Context/FilterContext';
import SearchButton from './SearchButton';
import Filters from './Filters/Filters';
import MapStack from './MapStack';
const SearchContainer = ({ Props }) => {

    return (
        <MetaWrapper>
            <Wrapper>
                <MapStack />
                <Filters />
            </Wrapper>
            <SearchButton>
                
            </SearchButton>
        </MetaWrapper>
    );
};
const MetaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 100%;
    
`;
const Wrapper = styled.div`
    display: flex;
    /* flex-direction:column; */
    justify-content: center;
    align-items: center;
    max-height: 100%;
    min-height: 620px;
    margin: 10px;
    width: 100%;
`;

<<<<<<< HEAD
=======
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
>>>>>>> b440a6fd343ec478b9ded7a30aa3355ffbece781



<<<<<<< HEAD
=======
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
            accumulator[attribute] = constructSingleAttributeSummary(attribute);
            return accumulator;
        }, mergedRequireSummary);
};

const SearchButton = styled.button`
    border: none;
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
    margin: 20px;
`;
>>>>>>> b440a6fd343ec478b9ded7a30aa3355ffbece781

export default SearchContainer;
