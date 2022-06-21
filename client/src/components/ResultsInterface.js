import React from 'react';
import styled from 'styled-components';
import AttrDisplay from './Sidebars/AttrDisplay';
import SearchResults from './SearchResults/SearchResults';
import AssetDisplay from './Sidebars/AssetDisplay';
import FilterContext from './Context/FilterContext';
import SubdivisionContext from './Context/SubdivisionsContext';
const ResultsInterface = ({ myProps }) => {
    const { searchResults, searchPending } = React.useContext(FilterContext);
    const { allowedListings } = React.useContext(SubdivisionContext);
    const showResultsInterface = searchPending || searchResults;
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>ResultsInterface.js:13 "showResultsInterface"',
        showResultsInterface
    );
    return (
        (showResultsInterface && (
            <>
                <AttrDisplay />
                <SearchResults />
                <AssetDisplay />
            </>
        )) ||
        null
    );
};

export default ResultsInterface;
