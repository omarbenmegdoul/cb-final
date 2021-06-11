import React from 'react';
import styled from 'styled-components';
import Listing from '../Listing/Listing.js';
import simpleData from '../../simpleData';

const SearchResults = ({ Props }) => {
    const listingKeys = Object.keys(simpleData).slice(0, 30);
    return (
        <Wrapper>
            {listingKeys.map((k) => (
                <Listing {...simpleData[k]}></Listing>
            ))}
        </Wrapper>
    );
};
const Wrapper = styled.div`width:100%`;
export default SearchResults;
