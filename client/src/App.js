import React from 'react';
import styled from 'styled-components';
import ContentWrapper from './components/ContentWrapper.js';
import {
  FilterProvider
} from './components/Context/FilterContext.js';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import AssetDisplay from './components/Sidebars/AssetDisplay';
import QuickControls from './components/Sidebars/AttrDisplay.js';

const App = () => {
  
    return (
        <AppWrapper>
            <FilterProvider>
                <GlobalStyles />
                <Header></Header>
                <QuickControls />
                <ContentWrapper>
                    <SearchContainer />
                    <SearchResults />
                </ContentWrapper>
                <AssetDisplay/>
            </FilterProvider>
        </AppWrapper>
    );
};
export default App;

const AppWrapper = styled.div`
    height: 100%;
    position:relative;
`;

