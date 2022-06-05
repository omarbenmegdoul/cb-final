import React from 'react';
import styled from 'styled-components';

import { specialAttributePrettyize } from '../Filters/FilterConfig';
import Attributes from './Attributes';
import StarHideControls from './StarHideControls';
import TextSection from './TextSection';
import Thumbnails from './Thumbnails';
import Title from './Title';

const Listing = (props) => {
    const listingWrapper = React.useRef(null);
    React.useEffect(() => {
        props.observer &&
            listingWrapper &&
            props.observer.observe(listingWrapper.current);
    }, [props.observer, listingWrapper]);

    return (
        <Wrapper
            ref={listingWrapper}
            id={`listing_${props.id}`}
            className={`listing-observe${props.starred ? ' starred' : ''}`}
            data-index={props.listingIndex}
        >
            <HeaderWrapper>
                <Title {...props} />
            </HeaderWrapper>
            <SubWrapper>
                <TextSection {...props} />
                <Attributes {...props} />
                <Thumbnails {...props} />
            </SubWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    content-visibility: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
    max-width: 100%;
    &.starred: {
        border: 1px solid gold;
        border-radius: 5px;
    }
`;

const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    background-color: var(--blackSecondary);
    border-radius: 5px;
    padding: 0 40px;
    width: 100%;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export default Listing;
