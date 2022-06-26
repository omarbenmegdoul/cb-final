import React, { useContext } from 'react';
import { keyGroupings } from '../Filters/FilterConfig';
import SubdivisionContext from './SubdivisionsContext';
import UserContext from './UserContext';

const FilterContext = React.createContext({});
export const filterStarredAndHidden = ({ listing, userData, settings }) => {
    if (!userData || !settings) return true;
    const conditions = {};

    if (settings.excludeUnstarred) {
        conditions.excludeUnstarred = userData.whitelists.includes(listing.id);
    }
    if (settings.excludeStarred) {
        conditions.excludeStarred = !userData.whitelists.includes(listing.id);
    }
    if (settings.excludeUnhidden) {
        conditions.excludeUnhidden = userData.blacklists.includes(listing.id);
    }
    if (settings.excludeHidden) {
        conditions.excludeUnhidden = !userData.blacklists.includes(listing.id);
    }
    if (listing.id === '1605114861') {
        console.log(
            '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>FilterContext.js:24 "settings"',
            settings
        );
        console.log(
            '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>FilterContext.js:24 "conditions"',
            conditions
        );
    }
    return (
        !Object.values(conditions).length ||
        Object.values(conditions).every(Boolean)
    );
};
export const FilterProvider = ({ children }) => {
    const { userData } = useContext(UserContext);
    const { allowedListings } = useContext(SubdivisionContext);
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>FilterContext.js:30 "allowedListings"',
        allowedListings
    );
    const [userFilters, setUserFilters] = React.useState({});
    const [searchResults, setSearchResults] = React.useState(null);
    const [searchPending, setSearchPending] = React.useState(false);

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

    const filteredSearchResults = searchResults
        ?.filter((sR) => {
            return !allowedListings.length || allowedListings.includes(sR.id);
        })
        ?.filter((sR) => {
            const allowed = filterStarredAndHidden({
                listing: sR,
                settings: starAndBlacklistSettings,
                userData,
            });
            if (sR.id === '1605114861') {
                console.log(
                    '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>FilterContext.js:128 "allowed"',
                    allowed
                );
            }
            return allowed;
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
                searchPending,
                setSearchPending,
                starAndBlacklistSettings,
                starAndBlacklistSettingsDispatch,
                filteredSearchResults,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
