import React from 'react';
import styled from 'styled-components';
import MapBgBlock from './Map';
import MapGrid from './MapGrid';
const MapStack = () => {
    return (
      <>
        <h2>Select search area</h2>
          <Wrapper>
            
              <MapGrid />
              <MapBgBlock />
          </Wrapper>
      </>
    );
};
const Wrapper = styled.div`
    position: relative;
    margin:10px 0;
`;
export default MapStack;
