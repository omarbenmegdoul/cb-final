import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import Sidebar from './Sidebar';
const AssetDisplay = ({ Props }) => {
    const { searchResults } = React.useContext(FilterContext);
    return (
        <Sidebar id="asset_display" big right>
           <PositioningParent>
              {searchResults?.slice(0,10)?.map((sR, topIndex) => {
                  return sR.imgs.map((img, index) => {
                      // sR.id === '1505750291' &&
                      //     console.log(
                      //         `❗ AssetDisplay.js:12 'sR.id + '_hiddenimg_' + index'`,
                      //         sR.id + '_hiddenimg_' + index,
                      //         searchResults.length
                      //     );
                      return (
                          <FullAssetWrapper id={sR.id + '_hiddenimg_' + index}>
                              <FullImg src={img.href} />
                              <span>Image #{index+1}</span>
                          </FullAssetWrapper>
                      );
                  });
                  // <FullAssetWrapper id={sR.id+"_hiddenassets_"+}
              })}
           </PositioningParent>
        </Sidebar>
    );
};
const Wrapper = styled.div``;
const FullImg = styled.img`
    width: 90%;
    object-fit: cover;
    margin: 10px;
    border-radius:5px;
`;
const PositioningParent = styled.div`
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    margin:0;
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
    width:100%;
    left: 200vw;
    &.show {
        left: 10px;
    }
`;
export default AssetDisplay;
