import React from 'react';
import styled from 'styled-components';
import { attributeDisplay, keyGroupings } from '../Filters/FilterConfig';

const FilterContext = React.createContext({});

export const FilterProvider = ({ children }) => {
    const [userFilters, setUserFilters] = React.useState({});
    const defaultFilterHiding = Object.keys(keyGroupings).reduce(
        (accumulator, key) => {
            accumulator[key] = key === "g_lease";
            return accumulator;
        },
        {}
    );
    console.log(
        `❗ FilterContext.js:16 'defaultFilterHiding'`,
        defaultFilterHiding
    );
    const reducer = (state, action) => {
        console.log(`❗ FilterContext.js:21 '[state,action]'`, [state, action]);
        const output = { ...state };
        switch (action.type) {
            case 'all':
                Object.keys(state).forEach(
                    (key) => (output[key] = action.value)
                );
                return output;
            case 'one':
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
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
const Wrapper = styled.div``;
export default FilterContext;
