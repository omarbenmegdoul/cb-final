import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import Sidebar from './Sidebar';
const APIKEY = "";

const AssetDisplay = ({ Props }) => {
    const { searchResults, allowedListings } = React.useContext(FilterContext);
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
                    .map((listing, topIndex) => {
                        return <ListingFullAssets listing={listing} />;
                    })
            }
        </Wrapper>
    );
};

const ListingFullAssets = ({ listing }) => {
    return [
        listing.imgs.map((img, index) => {
            return (
                <FullAssetWrapper id={listing.id + '_hiddenimg_' + index}>
                    <FullImg src={img.href} />
                    <span>Image #{index + 1}</span>
                </FullAssetWrapper>
            );
        }),
        <FullAssetWrapper id={listing.id + '_map'}>
            {
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
                    src={`https://www.google.com/maps/embed/v1/search?q=${listing.map.mapAddress}&key=${APIKEY}`}
                    allowfullscreen
                ></iframe>
            }
            <span>Map</span>
        </FullAssetWrapper>,
    ];
};
const Wrapper = styled.div`
    /* align-self: flex-end; */
    background-color: rgba(0,0,255,0.5);
    height: 100vh;
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease-out;
    /* transition-delay:0.1s; */
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
  background-color:rgba(0,255,0,0.5);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    top:-300vh;
    &.show {
        top:0;
    }
`;
export default AssetDisplay;
