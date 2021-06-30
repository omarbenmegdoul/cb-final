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
    const showResultsInterface =
        searchPending || ((allowedListings?.length || allowedListings === null) && searchResults!==null);

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
