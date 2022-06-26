import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../Context/UserContext';
const Username = () => {
    const { username, setUsername, userData } = useContext(UserContext);
    const [inputtingUsername, setInputtingUsername] = useState(false);
    const inputRef = useRef('');
    return !inputtingUsername ? (
        <>
            {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
            <button
                onClick={() => {
                    setInputtingUsername(true);
                }}
            >
                {username ? `Logged in as '${username}'` : 'Click to login'}
            </button>
        </>
    ) : (
        <Wrapper>
            <input ref={inputRef} placeholder="enter a username" type="text" />
            <button
                onClick={() => {
                    setUsername(inputRef.current.value);
                    setInputtingUsername(false);
                }}
            >
                👌
            </button>
            <button
                onClick={() => {
                    inputRef.current.value = '';
                    setInputtingUsername(false);
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
export default Username;
