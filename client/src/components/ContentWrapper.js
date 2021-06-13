import React from 'react';
import styled from 'styled-components';
import FilterContext from './Context/FilterContext';
const ContentWrapper = ({ children}) => {
  const {
    attrHidingSettings,
    attrHidingSettingsDispatch,
    collapsedFilterControls,
    setCollapsedFilterControls,
    searchResults
} = React.useContext(FilterContext);
    const classes = collapsedFilterControls ? "expanded" : "" + searchResults ? "heroheight" : "";
    return <Wrapper className={collapsedFilterControls ? "expanded" : ""}>{children}</Wrapper>;
};
const Wrapper = styled.div`
    padding: 15px;
    background-color: var(--blackPurple);
    min-width: 600px;
    width: 55%;
    margin: 0px 30% 0% 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    z-index: 0;
    transition:all 0s ease-out;
    transition-delay:0.1s; 
    &.expanded {
        margin: 0 30% 0 50px;
        /* background-color: #000; */
        width: calc(70% - 50px);
        transition:all 0.1s ease-out;
        transition-delay:0s;
    }
    &.heroheight {
      max-height:calc(100vh - var(--header-height));
    }
`;
export default ContentWrapper;
