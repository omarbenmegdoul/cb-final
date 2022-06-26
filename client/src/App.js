import React from 'react';
import styled from 'styled-components';
import ContentWrapper from './components/ContentWrapper.js';
import { FilterProvider } from './components/Context/FilterContext.js';
import { ScrollProvider } from './components/Context/ScrollProgressContext';
import { SubdivisionProvider } from './components/Context/SubdivisionsContext.js';
import { UserProvider } from './components/Context/UserContext.js';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import HeroWrapper from './components/HeroWrapper.js';
import ResultsInterface from './components/ResultsInterface.js';
import SearchContainer from './components/SearchContainer.js';

const App = () => {
    return (
        <AppWrapper>
            <UserProvider>
                <SubdivisionProvider>
                    <FilterProvider>
                        <ScrollProvider>
                            <GlobalStyles />
                            <Header></Header>
                            <HeroWrapper>
                                <SearchContainer />
                            </HeroWrapper>
                            <ContentWrapper>
                                <ResultsInterface />
                            </ContentWrapper>
                        </ScrollProvider>
                    </FilterProvider>
                </SubdivisionProvider>
            </UserProvider>
        </AppWrapper>
    );
};
export default App;

const AppWrapper = styled.div`
    height: 100%;
    position: relative;
`;
