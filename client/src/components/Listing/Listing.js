import React from 'react';
import styled from 'styled-components';
import Divider from '../Bits/Divider';
import * as mapmarker from '../../map-marker-1.png';

import {
    attributeDisplay,
    keyGroupings,
    niceKeyGroupings,
} from '../Filters/FilterConfig';

import { deJSONizeValue } from '../../utils';

const valueIsBinary = (x) => {
    return [0, 1].includes(parseInt(x));
};

const Listing = (props) => {
    return (
            <Wrapper>
                <a href={props.cntxt.url}><h2>{`${props.title} \u22C5 $${
                    parseInt(props.cntxt.d.prc) / 100
                }`}</h2></a>
                <SubWrapper>
                    <TextWrapper>
                        <DescQuoteWrapper>
                            {props.cntxt.map.mapAddress} |{' '}
                            {props.cntxt.timeposted}
                        </DescQuoteWrapper>
                        <DescQuoteWrapper>
                            <CurlyQuote>{'Description'}</CurlyQuote>
                            <Description>{props.cntxt.description}</Description>
                        </DescQuoteWrapper>
                    </TextWrapper>
                    <DataTray>
                        {Object.keys(props.cntxt.d).filter(key=>!["prc","rentalsvirtualoptions_s"].includes(key)).map((key) => {
                            const val = deJSONizeValue(props.cntxt.d[key]);
                            !attributeDisplay[key] && console.log(`❗ Listing.js:38 '["Warning: key not in attributeDisplay",key]' <${typeof ["Warning: key not in attributeDisplay",key]}>`,["Warning: key not in attributeDisplay",key]);
                            return (
                                <RentalAttribute
                                    className={
                                        !valueIsBinary(val)
                                            ? ''
                                            : parseInt(val) === 0
                                            ? 'false-binary-attribute'
                                            : 'true-binary-attribute'
                                    }
                                >
                                    {valueIsBinary(val)
                                        ? attributeDisplay[key].pretty
                                        : attributeDisplay[key].pretty +
                                          ': ' +
                                          val}
                                </RentalAttribute>
                            );
                        })}
                    </DataTray>
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
    margin:10px;
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
    background-color: var(--black);
    border-radius: 5px;
    width: calc(100% - 100px);
    max-height: 150px;
    overflow-y: auto;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ThumbnailTray = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-wrap:wrap;
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
