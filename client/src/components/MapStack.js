import React from 'react';
import styled from 'styled-components';
import MapBgBlock from './Map';
import MapGrid from './MapGrid';
const MapStack = () => {
    return (
      <>
          <Wrapper>
            
              <MapGrid />
              <MapBgBlock />
          </Wrapper>
      </>
    );
};
const Wrapper = styled.div`
    position: relative;
    margin:0;
`;
export default MapStack;
