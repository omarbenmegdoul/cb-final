import React from 'react';
import styled from 'styled-components';
import Listing from '../Listing/Listing.js';
import FilterContext from '../Context/FilterContext.js';
import Divider from '../Bits/Divider.js';

const SearchResults = ({ Props }) => {
    const { searchResults, allowedListings } = React.useContext(FilterContext);

    //TODO-high React.useEffect to scroll
    return (
        searchResults && (
            <>
                <Divider />
                <h1>{`${searchResults.filter(sR=>!allowedListings||allowedListings.includes(sR.id)).length} found`}</h1>
                <Wrapper>
                    {searchResults.filter(sR=>!allowedListings||allowedListings.includes(sR.id)).map((sR) => (
                        
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
