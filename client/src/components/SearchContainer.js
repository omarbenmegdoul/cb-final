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





export default SearchContainer;
