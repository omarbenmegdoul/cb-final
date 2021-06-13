import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
const Sidebar = (props) => {
    const {
        attrHidingSettings,
        attrHidingSettingsDispatch,
        collapsedFilterControls,
        setCollapsedFilterControls,
    } = React.useContext(FilterContext);
    return (
        <>
          {!props.right && <PositioningParent>
              <Wrapper
                  className={`${props.big ? 'big' : ''} ${
                      props.right ? 'right' : ''
                  } `}
              >
                  {props.children}
              </Wrapper>
          </PositioningParent>}
         { props.right && <Wrapper
          className={`${props.big ? 'big' : ''} ${
              props.right ? 'right' : ''
          } `}
      >
          {props.children}
      </Wrapper>}
        </>
    );
};
const Wrapper = styled.div`
    /* background-color: #00f; */
    height: 100vh;
    position: sticky;
    top: 0px;
    margin-top: calc(100vh - var(--header-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease-out;
    /* transition-delay:0.1s; */
    width: 100%;
    & button {
      transition: all 0.1s  ease-out;
      position:relative;
      left:0;
      width:75%;
      opacity:1
    }
    & h2 {
        transition: all 0.1s  ease-out;
    }
    &.collapsed > div {
        transition: all 0.1s  ease-out;
        transform: rotate(-90deg);
    }
    &.big {
        width: 30%;
    }
    &.right {
        left: calc(100vw - 15%);
        margin-top:0;
        position:fixed;
        z-index:4;
    }
    &.big.right {
        left: calc(100vw - 30% - 30px);
    }
    & > * {
        margin: 15px;
        /* position:absolute; */
    }
    &.collapsed > * {
        margin: 0px;
        /* position:absolute; */
    }
    &.collapsed {
        width: 50px;
        & button {
            left:-30vh;
            width:30vh;
            opacity:0;
        }
    }
`;
const PositioningParent = styled.div`
    position: absolute;
    z-index: 0;
    width: 15%;
    height: calc(100% - var(--header-height));
    top: var(--header-height);
    /* background-color: #0f0; */
`;
export default Sidebar;
