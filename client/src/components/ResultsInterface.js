import React from 'react';
import styled from 'styled-components';
import AttrDisplay from './Sidebars/AttrDisplay';
import SearchResults from './SearchResults/SearchResults';
import AssetDisplay from './Sidebars/AssetDisplay';
import FilterContext from './Context/FilterContext';
const ResultsInterface = ({ myProps }) => {
    const { searchResults, allowedListings } = React.useContext(FilterContext);
    const showResultsInterface =
        (allowedListings?.length || allowedListings === null) && searchResults?.length;

    return showResultsInterface && (
            <>
                <AttrDisplay />
                <SearchResults />
                <AssetDisplay />
            </>
        ) || null;
    ;
};

export default ResultsInterface;
