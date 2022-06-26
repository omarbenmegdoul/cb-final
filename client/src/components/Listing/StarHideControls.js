import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext.js';
import UserContext from '../Context/UserContext.js';
const StarHideControls = (props) => {
    const { setSearchResults } = React.useContext(FilterContext);
    const { username, userData, setUserData } = React.useContext(UserContext);
    const hideControl = !userData.blacklists.includes(props.id) ? '✖️' : '❌';
    const starControl = !userData.whitelists.includes(props.id) ? '🤍' : '💖';

    const handleClick = async (buttonName) => {
        const list = buttonName === 'starred' ? 'whitelists' : 'blacklists';
        const wasInactive = !userData[list].includes(props.id);

        setUserData((data) => ({
            ...data,
            [list]: wasInactive
                ? [...data[list], props.id]
                : data[list].filter((x) => x !== props.id),
        }));

        await fetch(
            `http://localhost:5678/data/${username}/${list}/${props.id}/${
                wasInactive ? 'push' : 'pull'
            }`,
            {
                method: 'PATCH',
                // body: JSON.stringify({}),
                //TODO: onlogin add username to localstorage
                headers: { 'Content-Type': 'application/json' },
            }
        );
    };

    return (
        <Wrapper>
            &nbsp;|{' '}
            <Button
                onClick={() => {
                    handleClick('hidden');
                }}
            >
                {hideControl}
            </Button>{' '}
            |{' '}
            <Button
                onClick={() => {
                    handleClick('starred');
                }}
            >
                {starControl}
            </Button>
        </Wrapper>
    );
};
const Wrapper = styled.div``;
const Button = styled.button``;
export default StarHideControls;
