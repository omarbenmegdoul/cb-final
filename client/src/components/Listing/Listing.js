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
        1 + props.description.indexOf('<p>')
            ? props.description
            : props.description
                  .split('\n')
                  .filter((line) => line !== '')
                  .map((line) => `<p>${line}</p>`)
                  .join('');

    return (
        <TextWrapper>
            <DescQuoteWrapper>
                {props.map.mapAddress} | {props.timeposted}
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
                const val = props[key];
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
const scrollThumbnails = (ev, amount, stateSetter) => {
    const removePx = (s) => {
        return parseInt(s.split('px')[0]);
    };
    const imgsToMove = ev.target.parentElement.getElementsByTagName('img');
    Array.from(imgsToMove).forEach((imgToMove) => {
        const newVal = `${
            parseInt(
                imgToMove.style.left !== ''
                    ? removePx(imgToMove.style.left)
                    : '0'
            ) +
            amount * 200
        }px`;
        imgToMove.style.left = newVal;
    });
    const clientWidth = ev.target.parentElement.clientWidth;
    const scrollWidth = ev.target.parentElement.scrollWidth;
    const position = removePx(imgsToMove[0].style.left);
    console.log(`❗ Listing.js:103 '[clientWidth,scrollWidth,position]'`, [
        clientWidth,
        scrollWidth,
        position,
    ]);
    const hitLastImg = position <= clientWidth - scrollWidth;
    const stateToSet = position >= 0 ? -1 : hitLastImg ? 1 : 0;

    stateSetter(stateToSet);

    // console.log(
    //     `❗ Listing.js:90 'ev.target.parentElement.clientWidth'`,
    //     ev.target.parentElement.clientWidth
    // );
    // console.log(
    //     `❗ Listing.js:90 'ev.target.parentElement.scrollWidth'`,
    //     ev.target.parentElement.scrollWidth
    // );
};

const MapMarker = (props) => {
    const [isIntersecting, setIntersecting] = React.useState(false);
    return (
        <img
            id={props.id + '_map_marker'}
            className={`map-marker ${
                props.scrollPosition === 'noscroll' ? 'noscroll' : ''
            }`}
            src="http://simpleicon.com/wp-content/uploads/map-marker-1.png"
        />
    );
};

const toggleAsset = (id) => {
    const shown = document.querySelector('#asset_display .show');
    shown?.length && Array.from(shown).forEach((elem) => elem.classList.remove('show'));
    // console.log(`❗ Listing.js:142 'id'`,id);
    document.getElementById(id).classList.toggle("show")
    console.log(`❗ Listing.js:144 'document.getElementById(id)'`,document.getElementById(id));
    // console.log(`❗ Listing.js:144 'toShow' <${typeof toShow}>`,toShow);
};

const Listing = (props) => {
    const [scrollPosition, setScrollPosition] = React.useState(-1);
    const mapMarkerElement = React.useRef(null);
    const thumbnailTray = React.useRef(null);

    // console.log(`❗ Listing.js:129 'props'`,props);
    React.useEffect(() => {
        const mapMarkerPos = document
            .getElementById(props.id + '_map_marker')
            .getBoundingClientRect();
        const thumbnailsPos = document
            .getElementById(props.id + '_thumbnails')
            .getBoundingClientRect();
        if (mapMarkerPos.right < thumbnailsPos.right) {
            setScrollPosition('noscroll');
            console.log(
                `❗ Listing.js:139 '[props.title,mapMarkerPos.right,thumbnailsPos.right]'`,
                [props.title, mapMarkerPos.right, thumbnailsPos.right]
            );
        }
    }, []);

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
                <ThumbnailTray
                    className={scrollPosition === 'noscroll' ? 'noscroll' : ''}
                    id={props.id + '_thumbnails'}
                >
                    {props.imgs.map((x, index) => {
                      props.id==="1505750291" && console.log(`❗ Listing.js:185 'props.id + '_hiddenimg_' + index'`,props.id + '_hiddenimg_' + index);
                      return (
                        <img
                            className={
                                scrollPosition === 'noscroll' ? 'noscroll' : ''
                            }
                            src={x.href}
                            id={props.id + '_thumb_' + index}
                            onMouseOver={() => {
                                toggleAsset(props.id + '_hiddenimg_' + index);
                            }}
                            onMouseLeave={() => {
                                toggleAsset(props.id + '_hiddenimg_' + index);
                            }}
                        ></img>
                    )})}
                    <MapMarker
                        title={props.title}
                        id={props.id}
                        scrollPosition={scrollPosition}
                        setScrollPosition={setScrollPosition}
                    />
                    {/* <img
                        id={props.id + '_map_marker'}
                        className={`map-marker ${
                            scrollPosition === 'noscroll' ? 'noscroll' : ''
                        }`}
                        src="http://simpleicon.com/wp-content/uploads/map-marker-1.png"
                    /> */}
                    {scrollPosition != 'noscroll' && !!(scrollPosition + 1) && (
                        <ScrollButton
                            onClick={(ev) =>
                                scrollThumbnails(ev, 1, setScrollPosition)
                            }
                        >
                            {'<'}
                        </ScrollButton>
                    )}
                    {scrollPosition != 'noscroll' && !!(scrollPosition - 1) && (
                        <ScrollButton
                            onClick={(ev) =>
                                scrollThumbnails(ev, -1, setScrollPosition)
                            }
                            className="right"
                        >
                            {'>'}
                        </ScrollButton>
                    )}
                </ThumbnailTray>
            </SubWrapper>
        </Wrapper>
    );
};
const ThumbnailTray = styled.div`
    /* background-color: var(--whiteLight); */
    /* padding: 8px; */
    border-radius: 5px;
    position: relative;
    margin: 10px;
    width: 100%;
    display: flex;
    overflow-x: hidden;
    /* height: 130px; */
    &.noscroll {
        justify-content: center;
    }
    img {
        position: relative;
        max-height: 100px;
        border-radius: 5px;
        margin: 0 7px;
        transition: left 0.3s cubic-bezier(0.2, 1.01, 0.6, 0.95);
        left: 0px;
    }
    img.noscroll {
        position: static;
        max-height: 100px;
        border-radius: 5px;
        margin: 0 7px;
        transition: left 0.3s cubic-bezier(0.2, 1.01, 0.6, 0.95);
        /* left: 10px; */
    }
    .map-marker {
        filter: invert(100%);
        border: 2px rgba(0, 0, 0, 0.5) solid;
        padding: 30px;
    }
`;
const ScrollButton = styled.div`
    cursor: pointer;
    font-size: 1.5em;
    position: absolute;
    background: rgb(65, 69, 88);
    background: linear-gradient(
        90deg,
        rgba(65, 69, 88, 1) 0%,
        rgba(0, 212, 255, 0) 100%
    );
    width: 10%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.right {
        left: 90%;
        background: linear-gradient(
            90deg,
            rgba(0, 212, 255, 0) 0%,
            rgba(65, 69, 88, 1) 100%
        );
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 10px;
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

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`;
const DescQuoteWrapper = styled.div`
    max-width: 100%;
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
    & a {
        text-decoration: underline;
    }
    font-weight: 300;
    overflow-wrap: anywhere;
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
