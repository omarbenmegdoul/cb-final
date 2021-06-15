import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import Sidebar from './Sidebar';
const APIKEY = "";

const AssetDisplay = ({ Props }) => {
    const { searchResults, allowedListings } = React.useContext(FilterContext);
    return (
        <Sidebar id="asset_display" big right>
            <PositioningParent>
                {
                    //TODO: use same filter as in SearchResults
                    searchResults
                        ?.filter(
                            (sR) =>
                                !allowedListings ||
                                allowedListings.includes(sR.id)
                        )
                        .map((sR, topIndex) => {
                            return [
                                sR.imgs.map((img, index) => {
                                    return (
                                        <FullAssetWrapper
                                            id={sR.id + '_hiddenimg_' + index}
                                        >
                                            <FullImg src={img.href} />
                                            <span>Image #{index + 1}</span>
                                        </FullAssetWrapper>
                                    );
                                }),
                                <FullAssetWrapper id={sR.id + '_map'}>
                                    {<iframe class="kjAppear" width="500" height="450" frameborder="0" style={{border:0, width:"90%",borderRadius:"5px",margin:"10px"}}
src={`https://www.google.com/maps/embed/v1/search?q=${ sR.map.mapAddress }&key=${APIKEY}`} allowfullscreen></iframe>}
                                    <span>Map</span>
                                </FullAssetWrapper>,
                            ];
                            // <FullAssetWrapper id={sR.id+"_hiddenassets_"+}
                        })
                }
            </PositioningParent>
        </Sidebar>
    );
};
const Wrapper = styled.div``;
const FullImg = styled.img`
    width: 90%;
    object-fit: cover;
    margin: 10px;
    border-radius: 5px;
`;
const PositioningParent = styled.div`
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    /* top: var(--header-height); */
    /* background-color: #0f0; */
`;
const FullAssetWrapper = styled.div`
    position: absolute;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    left: 200vw;
    &.show {
        left: 10px;
    }
`;
export default AssetDisplay;
