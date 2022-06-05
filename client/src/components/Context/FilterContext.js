import React from 'react';
import { keyGroupings } from '../Filters/FilterConfig';

const FilterContext = React.createContext({});

export const FilterProvider = ({ children }) => {
    const [subdivisionData, setSubdivisionData] = React.useState([]);
    const [userFilters, setUserFilters] = React.useState({});
    const [searchResults, setSearchResults] = React.useState(null);
    const [searchPending, setSearchPending] = React.useState(false);
    const [selectedSubdivisions, setSelectedSubdivisions] = React.useState([]);
    const [allowedListings, setAllowedListings] = React.useState(null);

    React.useEffect(() => {
        const combinedListingsBySelectedSubdivisions =
            selectedSubdivisions.reduce((accum, subd) => {
                return [...accum, ...subdivisionData[subd]];
            }, []);
        setAllowedListings(combinedListingsBySelectedSubdivisions);
    }, [selectedSubdivisions]);

    const [collapsedFilterControls, setCollapsedFilterControls] =
        React.useState(false);
    const defaultFilterHiding = Object.keys(keyGroupings).reduce(
        (accumulator, key) => {
            accumulator[key] = key === 'g_lease';
            return accumulator;
        },
        {}
    );
    const attrHidingReducer = (state, action) => {
        const output = { ...state };
        switch (action.type) {
            case 'selectedAll':
                Object.keys(state).forEach(
                    (key) => (output[key] = action.value)
                );
                return output;
            case 'selectedOne':
                output[action.key] = action.value;
                return output;
            default:
                return state;
        }
    };
    const starandBlacklistReducer = (state, action) => {
        const output = { ...state };
        switch (action.type) {
            case 'EXCLUDE-HIDDEN':
                output.excludeHidden = !state.excludeHidden;
                if (output.excludeHidden) {
                    output.excludeUnhidden = false;
                }
                return output;
            case 'EXCLUDE-NON-HIDDEN':
                output.excludeUnhidden = !state.excludeUnhidden;
                if (output.excludeUnhidden) {
                    output.excludeHidden = false;
                }
                return output;
            case 'EXCLUDE-STARRED':
                output.excludeStarred = !state.excludeStarred;
                if (output.excludeStarred) {
                    output.excludeUnstarred = false;
                }
                return output;
            case 'EXCLUDE-NON-STARRED':
                output.excludeUnstarred = !output.excludeUnstarred;
                if (output.excludeUnstarred) {
                    output.excludeStarred = false;
                }
                return output;
            default:
                return state;
        }
    };

    const [attrHidingSettings, attrHidingSettingsDispatch] = React.useReducer(
        attrHidingReducer,
        defaultFilterHiding
    );
    const [starAndBlacklistSettings, starAndBlacklistSettingsDispatch] =
        React.useReducer(starandBlacklistReducer, {
            excludeUnstarred: false,
            excludeUnhidden: false,
            excludeStarred: false,
            excludeHidden: true,
        });

    return (
        <FilterContext.Provider
            value={{
                userFilters,
                setUserFilters,
                attrHidingSettings,
                attrHidingSettingsDispatch,
                collapsedFilterControls,
                setCollapsedFilterControls,
                searchResults,
                setSearchResults,
                selectedSubdivisions,
                setSelectedSubdivisions,
                subdivisionData,
                setSubdivisionData,
                allowedListings,
                searchPending,
                setSearchPending,
                starAndBlacklistSettings,
                starAndBlacklistSettingsDispatch,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
