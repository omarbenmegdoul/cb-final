import React from 'react';
import styled from 'styled-components';
import FilterContext from './Context/FilterContext';
const HeroWrapper = ({ children}) => {
  const {
    collapsedFilterControls} = React.useContext(FilterContext);
    return <Wrapper className={collapsedFilterControls ? "expanded" : ""}>{children}</Wrapper>;
};
const Wrapper = styled.div`
    height: calc(100vh - var(--header-height));
    padding: 15px;
    background-color: var(--blackPurple);
    min-width: 600px;
    width: 55%;
    margin: 0px 30% 0% 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;

    &.expanded {
        margin: 0 30% 0 50px;
        /* background-color: #000; */
        width: calc(70% - 50px);

    }
    &.heroheight {
      max-height:calc(100vh - var(--header-height));
    }
`;
export default HeroWrapper;
