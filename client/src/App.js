import React from 'react';
import styled from 'styled-components';
import HeroWrapper from './components/HeroWrapper.js';
import { FilterProvider } from './components/Context/FilterContext.js';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer.js';
import ContentWrapper from './components/ContentWrapper.js';
import ResultsInterface from './components/ResultsInterface.js';
import { SubdivisionProvider } from './components/Context/SubdivisionsContext.js';

const App = () => {
    return (
        <AppWrapper>
            <FilterProvider>
                <SubdivisionProvider>
                    <GlobalStyles />
                    <Header></Header>
                    <HeroWrapper>
                        <SearchContainer />
                    </HeroWrapper>
                    <ContentWrapper>
                        <ResultsInterface />
                    </ContentWrapper>
                </SubdivisionProvider>
            </FilterProvider>
        </AppWrapper>
    );
};
export default App;

const AppWrapper = styled.div`
    height: 100%;
    position: relative;
`;
