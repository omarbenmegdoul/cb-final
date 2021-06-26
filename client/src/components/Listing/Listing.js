import React from 'react';
import styled from 'styled-components';
import { specialAttributePrettyize } from '../Filters/FilterConfig';
import Attributes from './Attributes';
import TextSection from './TextSection';
import Thumbnails from './Thumbnails';


const Listing = (props) => {

    return (
        <Wrapper>
            <a href={props.url}>
                <h2>{`${props.title} \u22C5 $${
                    parseInt(props.prc) / 100
                } \u22C5 avail. ${specialAttributePrettyize(
                    'dateavailable_tdt',
                    props.dateavailable_tdt
                )}`}</h2>
            </a>
            <SubWrapper>
                <TextSection {...props} />
                <Attributes {...props} />
                <Thumbnails {...props} />
            </SubWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
    max-width: 100%;
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

const AttributeGroupWrapper = styled.div`
    width: 100%;
`;

export default Listing;
