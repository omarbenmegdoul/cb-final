import React from 'react';
import styled from 'styled-components';
import HeroWrapper from './components/HeroWrapper.js';
import { FilterProvider } from './components/Context/FilterContext.js';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import AssetDisplay from './components/Sidebars/AssetDisplay';
import AttrDisplay from './components/Sidebars/AttrDisplay.js';
import ContentWrapper from './components/ContentWrapper.js';

const App = () => {
    return (
        <AppWrapper>
            <FilterProvider>
                <GlobalStyles />
                <Header></Header>
                <HeroWrapper>
                    <SearchContainer />
                </HeroWrapper>
                <ContentWrapper >
                    <AttrDisplay />
                    <SearchResults />
                    <AssetDisplay />
                </ContentWrapper>
            </FilterProvider>
        </AppWrapper>
    );
};
export default App;

const AppWrapper = styled.div`
    height: 100%;
    position: relative;
`;
