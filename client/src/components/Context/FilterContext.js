import React from 'react';
import { keyGroupings } from '../Filters/FilterConfig';

const FilterContext = React.createContext({});

export const FilterProvider = ({ children }) => {
    const [subdivisionData, setSubdivisionData] = React.useState([]);
    const [userFilters, setUserFilters] = React.useState({});
    const [searchResults, setSearchResults] = React.useState(null);
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
    const reducer = (state, action) => {
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
    const [attrHidingSettings, attrHidingSettingsDispatch] = React.useReducer(
        reducer,
        defaultFilterHiding
    );

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
                allowedListings
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
export default FilterContext;
