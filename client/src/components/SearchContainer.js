import React from 'react';
import styled from 'styled-components';
import FilterContext from './Context/FilterContext';
import { attributeDisplay, keyGroupings } from './Filters/FilterConfig';
import Filters from './Filters/Filters';
import MapStack from './MapStack';
const SearchContainer = ({ Props }) => {
    const { setUserFilters, setSearchResults } =
        React.useContext(FilterContext);
    return (
        <MetaWrapper>
            <Wrapper>
                <MapStack />
                <Filters />
            </Wrapper>
            <SearchButton
                onClick={async () => {
                    const filterSummary = constructAllFilterSummary();
                    const options = {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({
                            filterSummary,
                        }), // body data type must match "Content-Type" header
                    };
                    const res = await fetch('http://localhost:5678/listings', options);
                    const listings = await res.json();
                    console.log(`❗ SearchContainer.js:32 'listings'`,listings);
                    setSearchResults(JSON.parse(listings).data);
                    setUserFilters(filterSummary);
                }}
            >
                Search
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
    
`;
const Wrapper = styled.div`
    display: flex;
    /* flex-direction:column; */
    justify-content: center;
    align-items: center;

    max-height: calc(100vh - var(--header-height) -20px);
    min-height: 620px;
    margin: 10px;
    width: 100%;
`;

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

export default SearchContainer;
