import React from 'react';
import styled from 'styled-components';

const Thumbnails = (props) => {
    const [scrollPosition, setScrollPosition] = React.useState(-1);
    const [allowScrolling, setAllowScrolling] = React.useState(false);
    const [leftVisible, setLeftVisible] = React.useState(true);
    const [rightVisible, setRightVisible] = React.useState(false);

    React.useEffect(() => {
        setAllowScrolling(!(leftVisible && rightVisible));
    }, [leftVisible, rightVisible]);

    const trayClass =
        (!allowScrolling ? 'noscroll' : '') +
        (props.listingIndex >= 5 ? 'defer-img-display' : '');

    return (
        <ThumbnailTray className={trayClass} id={props.id + '_thumbnails'}>
            {props.imgs.map((img, index) => {
                return (
                    <Thumbnail
                        index={index}
                        title={props.title}
                        id={props.id}
                        imgSrc={img.href}
                        preload={props.listingIndex < 5}
                        setLeftVisible={setLeftVisible}
                    />
                );
            })}
            <MapMarker
                title={props.title}
                id={props.id}
                setRightVisible={setRightVisible}
            />

            {allowScrolling && !leftVisible && (
                <ScrollButton
                    onClick={(ev) => scrollThumbnails(ev, 1, setScrollPosition)}
                >
                    {'<'}
                </ScrollButton>
            )}
            {allowScrolling && !rightVisible && (
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
    );
};

export default Thumbnails;

const Thumbnail = (props) => {
    const thumbElem = React.useRef();
    const [isIntersecting, setIntersecting] = React.useState(true);

    React.useEffect(() => {
        if (props.index) {
            return;
        }
        const observer = new IntersectionObserver(
            ([img]) => setIntersecting(img.isIntersecting),
            {
                root: document.getElementById(props.id + '_thumbnails'),
                threshold: 1.0,
            }
        );
        // console.log(`❗ Listing.js:169 'thumbElem'`, thumbElem);
        observer.observe(thumbElem.current);

        return () => {
            if (props.index) {
                return;
            }
            observer.disconnect();
        };
    }, []);
    React.useEffect(() => {
        // console.log(`❗ Listing.js:138 'leftisIntersecting'`, isIntersecting);
        props.setLeftVisible(isIntersecting);
    }, [isIntersecting]);
    const scrollPosition = false;
    return (
        <img
            ref={thumbElem}
            className={scrollPosition === 'noscroll' ? 'noscroll' : ''}
            src={props.preload ? props.imgSrc : ''}
            data-src={props.imgSrc}
            id={props.id + '_thumb_' + props.index}
            onMouseOver={() => {
                toggleAsset(props.id + '_hiddenimg_' + props.index);
            }}
            onMouseLeave={() => {
                toggleAsset(props.id + '_hiddenimg_' + props.index);
            }}
        ></img>
    );
};

const toggleAsset = (id) => {
    const shown = document.querySelector('#asset_display .show');
    shown?.length &&
        Array.from(shown).forEach((elem) => elem.classList.remove('show'));
    document.getElementById(id).classList.toggle('show');
    // console.log(
    //     `❗ Listing.js:144 'document.getElementById(id)'`,
    //     document.getElementById(id)
    // );
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
            amount * 80
        }%`;
        imgToMove.style.left = newVal;
    });
    const clientWidth = ev.target.parentElement.clientWidth;
    const scrollWidth = ev.target.parentElement.scrollWidth;
    const position = removePx(imgsToMove[0].style.left);
    // console.log(`❗ Listing.js:103 '[clientWidth,scrollWidth,position]'`, [
    //     clientWidth,
    //     scrollWidth,
    //     position,
    // ]);
    const hitLastImg = position <= clientWidth - scrollWidth;
    const stateToSet = position >= 0 ? -1 : hitLastImg ? 1 : 0;

    stateSetter(stateToSet);
};

const MapMarker = (props) => {
    const markerElem = React.useRef();
    const [isIntersecting, setIntersecting] = React.useState(true);

    const observer = new IntersectionObserver(
        ([img]) => setIntersecting(img.isIntersecting),
        {
            root: document.getElementById(props.id + '_thumbnails'),
            threshold: 1.0,
        }
    );
    React.useEffect(() => {
        observer.observe(markerElem.current);

        return () => {
            observer.disconnect();
        };
    }, []);
    React.useEffect(() => {
        // console.log(`❗ Listing.js:138 'rightisIntersecting'`, isIntersecting);
        props.setRightVisible(isIntersecting);
    }, [isIntersecting]);
    return (
        <img
            ref={markerElem}
            id={props.id + '_map_marker'}
            className={`map-marker ${
                props.scrollPosition === 'noscroll' ? 'noscroll' : ''
            } `}
            onMouseOver={() => {
                toggleAsset(props.id + '_map');
            }}
            onMouseLeave={() => {
                toggleAsset(props.id + '_map');
            }}
            src="http://simpleicon.com/wp-content/uploads/map-marker-1.png"
        />
    );
};

const ThumbnailTray = styled.div`
    border-radius: 5px;
    position: relative;
    margin: 10px;
    width: 100%;
    display: flex;
    overflow-x: hidden;
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
    }
    .map-marker {
        filter: invert(100%);
        border: 2px rgba(0, 0, 0, 0.5) solid;
        padding: 30px;
    }
    &.defer-img-display > img {
        display: none;
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
        rgba(0, 212, 255, 0) 90%,
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
            rgba(0, 212, 255, 0) 10%,
            rgba(65, 69, 88, 1) 100%
        );
    }
`;
