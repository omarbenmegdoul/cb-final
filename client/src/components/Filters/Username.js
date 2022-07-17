import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';
import ButtonInput from './ButtonInput';
const Username = () => {
    const { username, setUsername, userData } = useContext(UserContext);

    return (
        <>
            {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
            <ButtonInput
                stateHolder={username}
                inputPlaceholder="your username here"
                handleClick={setUsername}
                buttonText={
                    username ? 'Logged in as ' + username : 'Click to login'
                }
            />
        </>
    );
};

export default Username;
