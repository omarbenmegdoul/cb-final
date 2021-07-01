import React from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
const ContentWrapper = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
=======
import FilterContext from './Context/FilterContext';
const ContentWrapper = ({ children}) => {
  const {
    collapsedFilterControls} = React.useContext(FilterContext);
    return <Wrapper className={collapsedFilterControls ? "expanded" : ""}>{children}</Wrapper>;
>>>>>>> b440a6fd343ec478b9ded7a30aa3355ffbece781
};
const Wrapper = styled.div`
display:flex;
flex-direction:row;
/* justify-content:flex-start; */
align-items:flex-start;
width:100%;
position:relative`;
export default ContentWrapper;
