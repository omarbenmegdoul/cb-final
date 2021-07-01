import React from 'react';
import styled from 'styled-components';
import FilterContext from './Context/FilterContext';
const ContentWrapper = ({ children}) => {
  const {
    collapsedFilterControls} = React.useContext(FilterContext);
    return <Wrapper className={collapsedFilterControls ? "expanded" : ""}>{children}</Wrapper>;
};
const Wrapper = styled.div`
display:flex;
flex-direction:row;
/* justify-content:flex-start; */
align-items:flex-start;
width:100%;
position:relative`;
export default ContentWrapper;
