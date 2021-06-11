import React from 'react';
import styled from 'styled-components';

const FilterContext = React.createContext({});

export const FilterProvider = ({ children }) => {
    
    return <FilterContext.Provider>{children}</FilterContext.Provider>;
};
const Wrapper = styled.div``;
export default FilterContext;
