import React from 'react';
import styled from 'styled-components';
import Listing from '../Listing/Listing.js';
import FilterContext from '../Context/FilterContext.js';


const SearchResults = ({ Props }) => {
    const { searchResults, allowedListings, collapsedFilterControls} = React.useContext(FilterContext);
    const scrollAnchor = React.useRef(null)
    React.useEffect(()=>{
      scrollAnchor.current.scrollIntoView({behavior:"smooth"});
    },[searchResults])
    return (
        searchResults && (
            <MetaWrapper ref={scrollAnchor} className={collapsedFilterControls?"expanded":""}>
                <h1>{`${searchResults.filter(sR=>!allowedListings||allowedListings.includes(sR.id)).length} found`}</h1>
                <Wrapper>
                    {searchResults.filter(sR=>!allowedListings||allowedListings.includes(sR.id)).map((sR) => (
                        
                        <Listing {...sR}></Listing>
                    ))}
                    {/* <Listing {...searchResults[0]}/> */}
                </Wrapper>
            </MetaWrapper>
        )
    );
};

const Wrapper = styled.div`
    width:90%;
    
`;
const MetaWrapper = styled.div`
background-color:var(--blackPurple);
width: 55%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
&.expanded {
      width: calc(70% - 50px);
    }`
export default SearchResults;
