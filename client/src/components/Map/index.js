import React, { useState } from 'react';
// import './App.css';
import Map from './Map';
import Layers from './Layers/Layers';
import TileLayer from './Layers/TileLayer';
import VectorLayer from './Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from './Source';
import { fromLonLat, toLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from './Controls/Controls';
import FullScreenControls from './Controls/Controls';
import styled from "styled-components"

let styles = {
    MultiPolygon: new Style({
        stroke: new Stroke({
            color: 'blue',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
    }),
};
const geojsonObject = undefined; // see full geojson object in Github
const geojsonObject2 = undefined; // see full geojson object in Github
const MapBgBlock = () => {
    const [center, setCenter] = useState([
        -73.58524707035448, 45.53189487297965,
    ]);
    // const [center, setCenter] = useState([-94.9065, 38.9884]);
    const [zoom, setZoom] = useState(835);
    const rotation = -0.5725;
    const [showLayer1, setShowLayer1] = useState(true);
    const [showLayer2, setShowLayer2] = useState(true);
    return (
        <Wrapper>
            <input
                type="number"
                onChange={(ev) => {
                    console.log(
                        `❗ MapBgBlock.js:37 'ev.target.value' <${typeof ev
                            .target.value}>`,
                        ev.target.value
                    );
                    setZoom(
                        parseInt(ev.target.value) || parseFloat(ev.target.value)
                    );
                }}
            ></input>
            <Map center={fromLonLat(center)} zoom={zoom} rotation={rotation}>
                <Layers>
                    <TileLayer source={osm()} zIndex={0} />
                    {/* {showLayer1 && (
          <VectorLayer
            source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )}
        {showLayer2 && (
          <VectorLayer
            source={vector({ features: new          GeoJSON().readFeatures(geojsonObject2, { featureProjection:               get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )} */}
                </Layers>
                <Controls>{/* <FullScreenControl /> */}</Controls>
            </Map>
            {/* <div>
      <input
        type="checkbox"
        checked={showLayer1}
        onChange={event => setShowLayer1(event.target.checked)}
      /> Johnson County
    </div> */}
            {/* <div>
                <input
                    type="checkbox"
                    checked={showLayer2}
                    onChange={(event) => setShowLayer2(event.target.checked)}
                />{' '}
                Wyandotte County
            </div> */}
        </Wrapper>
    );
};

const Wrapper = styled.div`
position:absolute;
top:0;
left:0;
z-index:-1;`
export default MapBgBlock;
