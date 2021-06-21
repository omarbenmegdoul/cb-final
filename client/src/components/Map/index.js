import React, { useState } from 'react';
import Map from './Map';
import Layers from './Layers/Layers';
import TileLayer from './Layers/TileLayer';
import { osm } from './Source';
import { fromLonLat } from 'ol/proj';
import Controls from './Controls/Controls';
import styled from 'styled-components';

const MapBgBlock = () => {
    const [center, setCenter] = useState([
        -73.58524707035448, 45.53189487297965,
    ]);
    const [zoom, setZoom] = useState(835);
    const rotation = -0.5725;

    return (
        <Wrapper>
            <Map center={fromLonLat(center)} zoom={zoom} rotation={rotation}>
                <Layers>
                    <TileLayer source={osm()} zIndex={0} />
                </Layers>
                <Controls></Controls>
            </Map>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;
export default MapBgBlock;
