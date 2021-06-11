import React from 'react';
import styled from 'styled-components';
import Divider from '../Bits/Divider';
import * as mapmarker from '../../map-marker-1.png';

import {
    attributeDisplay,
    keyGroupings,
    niceKeyGroupings,
    prettyKeyGroupings,
    specialAttributePrettyize,
} from '../Filters/FilterConfig';

import { deJSONizeValue } from '../../utils';
import { Filter } from '../Filters/FilterOptions';
import FilterContext from '../Context/FilterContext';

const valueIsBinary = (x) => {
    return [0, 1].includes(parseInt(x));
};

const TextSection = (props) => {
    const desc =
        1 + props.cntxt.description.indexOf('<p>')
            ? props.cntxt.description
            : props.cntxt.description
                  .split('\n')
                  .filter((line) => line !== '')
                  .map((line) => `<p>${line}</p>`)
                  .join('');

    return (
        <TextWrapper>
            <DescQuoteWrapper>
                {props.cntxt.map.mapAddress} | {props.cntxt.timeposted}
            </DescQuoteWrapper>
            <DescQuoteWrapper>
                <CurlyQuote>{'Description'}</CurlyQuote>
                <Description>
                    <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                </Description>
            </DescQuoteWrapper>
        </TextWrapper>
    );
};

const Attributes = (props) => {
    const { attrHidingSettings } = React.useContext(FilterContext);
    return Object.keys(keyGroupings).map((key) => {
        if (attrHidingSettings[key]) {
            return null;
        }
        const expandedProps = { ...props, group: key };
        return <AttributeGroup {...expandedProps} />;
    });
};

const AttributeGroup = (props) => {
    return (
        <div className="rounded-container-with-label lite">
            <span className="filter-name">
                {prettyKeyGroupings[props.group]}
            </span>
            {keyGroupings[props.group].map((key) => {
                const val = props.cntxt.d[key];
                const className =
                    'attribute-selection ' +
                    (!valueIsBinary(deJSONizeValue(val))
                        ? ''
                        : parseInt(deJSONizeValue(val)) === 0
                        ? 'excluded'
                        : 'selected');
                return (
                    <div className={className}>
                        {valueIsBinary(deJSONizeValue(val))
                            ? attributeDisplay[key].pretty
                            : attributeDisplay[key].pretty +
                              ': ' +
                              (attributeDisplay[key].prettyValues[val] ||
                                  specialAttributePrettyize(key, val))}
                    </div>
                );
            })}
        </div>
    );
};

const Listing = (props) => {
    return (
        <Wrapper>
            <a href={props.cntxt.url}>
                <h2>{`${props.title} \u22C5 $${
                    parseInt(props.cntxt.d.prc) / 100
                }`}</h2>
            </a>
            <SubWrapper>
                <TextSection {...props} />
                <Attributes {...props} />
                <ThumbnailTray>
                    {props.cntxt.imgs.map((x) => (
                        <img src={x.href}></img>
                    ))}
                    <img
                        className="map-marker"
                        src="http://simpleicon.com/wp-content/uploads/map-marker-1.png"
                    />
                </ThumbnailTray>
            </SubWrapper>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    /* width:100%; */
    
`;

const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    background-color: var(--blackSecondary);
    border-radius: 5px;
    padding: 0 40px;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`;
const DescQuoteWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 5px;
`;

const CurlyQuote = styled.div`
    position: relative;
    font-size: 1.2em;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const Description = styled.div`
    line-height: 1.5em;
    background-color: var(--black);
    border-radius: 5px;
    width: calc(100% - 100px);
    max-height: 150px;
    overflow-y: auto;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    & > div {
        margin: auto;
    }
    & p {
        line-height: 1.4em;
    }
    & p:not(:last-child) {
        margin-bottom: 0.75em;
    }
`;

const ThumbnailTray = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    img {
        max-height: 100px;
        border-radius: 5px;
        margin: 0 5px;
    }
    .map-marker {
        filter: invert(100%);
        border: 2px rgba(0, 0, 0, 0.5) solid;
        padding: 30px;
    }
`;
const DataTray = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
`;
const RentalAttribute = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;

    margin: 3px;
    padding: 8px;
    border-radius: 1000px;
    background-color: var(--whiteLight);
    border: 2px var(--white-500) solid;

    &.true-binary-attribute {
        border: 2px var(--green-500) solid;
    }
    &.false-binary-attribute {
        border: 2px var(--red-500) solid;
    }
`;

export default Listing;
