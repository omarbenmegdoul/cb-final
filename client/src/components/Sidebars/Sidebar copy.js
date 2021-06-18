import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import AttrDisplayCtrlButton from './AttrDisplayCtrlButton';
import {
  attributeDisplay,
  keyGroupings,
  prettyKeyGroupings,
} from '../Filters/FilterConfig';
const Sidebar = (props) => {
    const {
        collapsedFilterControls,
        setCollapsedFilterControls,
    } = React.useContext(FilterContext);
    return (
        <>
            <PositioningParent>
                <Wrapper
                    className={`${collapsedFilterControls ? 'collapsed' : ''}`}
                >
                    <Heading>
                        <h2>View settings</h2>
                        <h2
                            onClick={() =>
                                setCollapsedFilterControls(
                                    !collapsedFilterControls
                                )
                            }
                        >
                            {collapsedFilterControls ? '\u25BC' : '\u25C4'}
                        </h2>
                    </Heading>
                    {Object.keys(prettyKeyGroupings).map((key) => {
                        
                        return <AttrDisplayCtrlButton key={key} />;
                    })}
                </Wrapper>
            </PositioningParent>
        </>
    );
};
const Heading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease-out;
    /* background-color:#f00; */
    width: 15vh;
    min-width: 100%;
    white-space: no-wrap;
    & h2 {
        white-space: no-wrap;
        margin: 0 5px;
    }
`;

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
        transition: all 0.1s ease-out;
        position: relative;
        left: 0;
        width: 75%;
        opacity: 1;
    }
    & h2 {
        transition: all 0.1s ease-out;
    }
    &.collapsed > div {
        transition: all 0.1s ease-out;
        transform: rotate(-90deg);
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
            left: -30vh;
            width: 30vh;
            opacity: 0;
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
