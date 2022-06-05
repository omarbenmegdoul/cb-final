import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext.js';
const StarHideControls = (props) => {
    const hideControl = !props.hidden ? '✖️' : '❌';
    const starControl = !props.starred ? '🤍' : '💖';
    const { setSearchResults } = React.useContext(FilterContext);
    const handleClick = (buttonName) => {
        const updatedListing = { ...props, [buttonName]: !props[buttonName] };
        setSearchResults((searchResults) => {
            const thisListingIndex = searchResults.findIndex(
                (x) => x.id === props.id
            );

            return [
                ...searchResults.slice(0, thisListingIndex),
                updatedListing,
                ...searchResults.slice(thisListingIndex + 1),
            ];
        });
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
