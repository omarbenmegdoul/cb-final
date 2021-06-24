import React from 'react';
import styled from 'styled-components';
const ContentWrapper = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.div`
display:flex;
flex-direction:row;
/* justify-content:flex-start; */
align-items:flex-start;
width:100%;
position:relative`;
export default ContentWrapper;
