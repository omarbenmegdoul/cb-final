import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import ScrollContext from '../Context/ScrollProgressContext';
import SubdivisionContext from '../Context/SubdivisionsContext';
// import APIKEY from '../../APIKEY';

const AssetDisplay = ({ Props }) => {
    const { searchResults } = React.useContext(FilterContext);
    const { allowedListings } = React.useContext(SubdivisionContext);
    const { scrollProgress } = React.useContext(ScrollContext);
    return (
        <Wrapper className={`big right`}>
            {
                //TODO-low: put searchResults in a context?
                searchResults
                    ?.filter(
                        (listing) =>
                            !allowedListings ||
                            allowedListings.includes(listing.id)
                    )
                    .filter((sR, index) => {
                        return index < scrollProgress + 15;
                    })
                    .map((listing, listingIndex) => {
                        return (
                            <ListingFullAssets
                                preload={listingIndex < 10}
                                listing={listing}
                            />
                        );
                    })
            }
        </Wrapper>
    );
};

const ListingFullAssets = ({ listing, preload }) => {
    return [
        listing.imgs.map((img, index) => {
            return (
                <FullAssetWrapper
                    className="full-img-wrapper"
                    id={listing.id + '_hiddenimg_' + index}
                >
                    <FullImg
                        src={preload ? img.href : ''}
                        data-src={img.href}
                    />
                    <span>Image #{index + 1}</span>
                </FullAssetWrapper>
            );
        }),
        <FullAssetWrapper
            className="hidden-map-wrapper"
            id={listing.id + '_map'}
        >
            {/* {
                <iframe
                    width="500"
                    height="450"
                    frameborder="0"
                    style={{
                        border: 0,
                        width: '90%',
                        borderRadius: '5px',
                        margin: '10px',
                    }}
                    src
                    data-src={`https://www.google.com/maps/embed/v1/search?q=${listing.map.mapAddress}&key=${APIKEY}`}
                    
                ></iframe>
            } */}
            <span>Map</span>
        </FullAssetWrapper>,
    ];
};
const Wrapper = styled.div`
    /* align-self: flex-end; */

    height: 100vh;
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 30%;

    & button {
        transition: all 0.1s ease-out;
        position: relative;
        left: 0;
        width: 75%;
        opacity: 1;
    }
    & h2 {
        transition: all 0.1s ease-out;
    }

    margin-top: 0;
    /* z-index: 4; */

    & > * {
        /* margin: 15px; */
        /* position:absolute; */
    }
`;
const FullImg = styled.img`
    width: 90%;
    object-fit: cover;
    /* margin: 10px; */
    border-radius: 5px;
`;
// const PositioningParent = styled.div`
//     position: relative;
//     z-index: 0;
//     width: 100%;
//     height: 100%;
//     margin: 0;
//     /* top: var(--header-height); */
//     /* background-color: #0f0; */
// `;
const FullAssetWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    top: -300vh;
    &.show {
        top: 0;
    }
    &.hidden-map-wrapper {
    }
    &.full-img-wrapper {
        /* display: none; */
    }
    /* & iframe {
      content-visibility:;
    } */
`;
export default AssetDisplay;
