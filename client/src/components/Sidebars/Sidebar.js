import React from 'react';
import styled from 'styled-components';
const Sidebar = (props) => {
    return (
        <Wrapper
            className={`${props.big ? 'big' : ''} ${
                props.right ? 'right' : ''
            }`}
        >
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    z-index: 1;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - var(--header-height));
    top: var(--header-height);
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
    }
`;
export default Sidebar;
