import React, { useState } from 'react';
// import './App.css';
import Map from './components/Map/Map';
import Layers from './components/Map/Layers/Layers';
import TileLayer from './components/Map/Layers/TileLayer';
import VectorLayer from './components/Map/Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from './components/Map/Source/';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from './components/Map/Controls/Controls';
import FullScreenControls from './components/Map/Controls/Controls';
import MapBgBlock from './components/Map';
import GlobalStyles from './components/GlobalStyles';
import MapStack from './components/MapStack';

import {
    TL_PX,
    SUBDIVISION_0_0_CENTER,
    POINT_AT_CHI_1_PSI_0,
    POINT_AT_CHI_0_PSI_1,
    POINT_AT_CHI_1_PSI_1,
} from './constants';
console.log(
    `TL_PX,
    subdivISION_00_CEN,
    POINT_AT_CHI_1_PSI_0,
    POINT_AT_CHI_0_PSI_1,
    POINT_AT_CHI_1_PSI_1,`
);
// [TL_PX,
//   POINT_AT_CHI_1_PSI_0,
//   POINT_AT_CHI_0_PSI_1,
//   POINT_AT_CHI_1_PSI_1].forEach((x)=>console.log(`❗ App.js:25 'x' <${typeof x}>`,x))
[
    TL_PX,
    SUBDIVISION_0_0_CENTER,
    POINT_AT_CHI_1_PSI_0,
    POINT_AT_CHI_0_PSI_1,
    POINT_AT_CHI_1_PSI_1,
].forEach((x) => {
    const toPrint = x.map((n) => parseInt(String(n).split('.')[0]));
    console.log(toPrint);
});

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
const App = () => {
    return (
        <div>
            <GlobalStyles />
            <MapStack />
        </div>
    );
};
export default App;
