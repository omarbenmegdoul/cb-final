import React, { useState } from 'react';
// import './App.css';
import Map from "./components/Map/Map";
import Layers from "./components/Map/Layers/Layers";
import TileLayer from "./components/Map/Layers/TileLayer";
import VectorLayer from "./components/Map/Layers/VectorLayer"
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./components/Map/Source/";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from "./components/Map/Controls/Controls";
import FullScreenControls from "./components/Map/Controls/Controls";
import MapBgBlock from './components/Map';
import GlobalStyles from './components/GlobalStyles';
import MapStack from './components/MapStack';
let styles = {
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
};
const geojsonObject = undefined // see full geojson object in Github
const geojsonObject2 =undefined // see full geojson object in Github
const App = () => {
  
return (
  <div>
    <GlobalStyles/>
    <MapStack/>
    </div>
  );
}
export default App;