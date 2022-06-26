import React from 'react';
import styled from 'styled-components';

import {
    AttrDisplayCtrlButton,
    StarBlacklistControlButton,
} from './AttrDisplayCtrlButton';
import {
    prettyKeyGroupings,
    prettyStarWhitelistGroupings,
} from '../Filters/FilterConfig';
import FilterContext from '../Context/FilterContext';
import Username from './Username';
const AttrDisplay = (props) => {
    const { collapsedFilterControls, setCollapsedFilterControls } =
        React.useContext(FilterContext);
    return (
        <>
            <PositioningParent
                className={`${collapsedFilterControls ? 'collapsed' : ''}`}
            >
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
                    {Object.keys(prettyKeyGroupings).map((group) => {
                        return (
                            <AttrDisplayCtrlButton
                                key={group + 'ctrl_button'}
                                group={group}
                            />
                        );
                    })}
                    <Divider />
                    <Username />
                    {Object.keys(prettyStarWhitelistGroupings).map((group) => {
                        return (
                            <StarBlacklistControlButton
                                key={group + 'ctrl_button'}
                                group={group}
                            />
                        );
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
    /* background-color: rgba(255,0,0,0.5); */
    height: 100vh;
    /* position: sticky; */
    top: 0px;
    /* margin-top: calc(100vh - var(--header-height)); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* transition-delay:0.1s; */
    width: 100%;
    & button {
        /* transition: all 0.1s ease-out; */
        position: relative;
        left: 0;
        width: 75%;
        opacity: 1;
    }
    & h2 {
        /* transition: all 0.1s ease-out; */
    }
    &.collapsed > div {
        /* transition: all 0.1s ease-out; */
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
    position: sticky;
    z-index: 0;
    width: 15%;
    height: 100vh;
    top: 0;
    /* background-color: rgba(0,255,0,0.5); */
    &.collapsed {
        width: 50px;
    }
`;

const Divider = styled.div`
    height: 0px;
    width: 65%;
    border-top: 1px;
    border-color: white;
    border-style: solid;
    margin: 15px;
`;
export default AttrDisplay;
