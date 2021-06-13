import React from 'react';
import styled from 'styled-components';
import Listing from '../Listing/Listing.js';
import simpleData from '../../simpleData';
import { attributeDisplay, keyGroupings } from '../Filters/FilterConfig.js';
import FilterContext from '../Context/FilterContext.js';
import Divider from '../Bits/Divider.js';

const SearchResults = ({ Props }) => {
    const { searchResults } = React.useContext(FilterContext);
    const listingKeys = Object.keys(simpleData).slice(0, 30);
    console.log(`❗ SearchResults.js:12 'searchResults?.length'`,searchResults?.length);
    return (
        searchResults && (
            <>
                <Divider />
                <Wrapper>
                    {searchResults.slice(0,10).map((sR) => (
                        <Listing {...sR}></Listing>
                    ))}
                    {/* <Listing {...searchResults[0]}/> */}
                </Wrapper>
            </>
        )
    );
};

const Wrapper = styled.div`
    width: 100%;
`;
export default SearchResults;
