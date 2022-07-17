import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../Context/UserContext';
const ButtonInput = ({
    stateHolder,
    buttonText,
    inputPlaceholder,
    handleClick,
}) => {
    const [inputtingData, setInputtingData] = useState(false);
    const [nameInProgress, setNameInProgress] = useState('');

    return !inputtingData ? (
        <button
            onClick={() => {
                setInputtingData(true);
            }}
        >
            {buttonText}
        </button>
    ) : (
        <Wrapper>
            <input
                autoFocus
                placeholder={inputPlaceholder}
                type="text"
                onChange={(e) => {
                    setNameInProgress(e.target.value);
                }}
                value={nameInProgress}
            />
            <button
                onClick={() => {
                    handleClick(nameInProgress);
                    setInputtingData(false);
                }}
            >
                👌
            </button>
            <button
                onClick={() => {
                    setNameInProgress(stateHolder);
                    setInputtingData(false);
                }}
            >
                ❌
            </button>
        </Wrapper>
    );
};

const Display = styled.button`
    font-size: 30pt;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default ButtonInput;
