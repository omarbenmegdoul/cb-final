import React from 'react';
import styled from 'styled-components';
import Filters from './Filters/Filters';
import MapStack from './MapStack';
const SearchContainer = ({ Props }) => {
    return (
        <Wrapper>
            <MapStack />
            <Filters />
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: flex;
    /* flex-direction:column; */
    justify-content: center;
    align-items: center;
    height: calc(100vh - var(--header-height) - 20px);
    max-height: calc(100vh - var(--header-height) -20px);
    min-height: 620px;
    margin: 10px;
    width: 100%;
`;
export default SearchContainer;
