import React from 'react';
import styled from 'styled-components';
import { specialAttributePrettyize } from '../Filters/FilterConfig';
const Title = (props) => {
    return (
        <a href={props.url}>
            <h2>{`${props.listingIndex} | ${props.title} \u22C5 $${
                parseInt(props.prc) / 100
            } \u22C5 avail. ${specialAttributePrettyize(
                'dateavailable_tdt',
                props.dateavailable_tdt
            )}`}</h2>
        </a>
    );
};

export default Title;
