import React from 'react';
import styled from 'styled-components';
const Sidebar = (props) => {
    return (
        <PositioningParent>
            <Wrapper
                className={`${props.big ? 'big' : ''} ${
                    props.right ? 'right' : ''
                }`}
            >
                {props.children}
            </Wrapper>
        </PositioningParent>
    );
};
const Wrapper = styled.div`
    height: 100vh;
    position: sticky;
    top: 0px;
    margin-top: calc(100vh - var(--header-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.big {
        width: 30%;
    }
    &.right {
        left: calc(100vw - 15%);
    }
    &.big.right {
        left: calc(100vw - 30%);
    }
    & > * {
        margin: 15px;
        /* position:absolute; */
    }
`;
const PositioningParent = styled.div`
    position: absolute;
    z-index: 2;
    width: 15%;
    height: calc(100% - var(--header-height));
    top: var(--header-height);
`;
export default Sidebar;
