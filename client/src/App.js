import React, { useState } from 'react';
import simpleData from './simpleData.js';

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
import styled from 'styled-components';
import {
    TL_PX,
    SUBDIVISION_0_0_CENTER,
    POINT_AT_CHI_1_PSI_0,
    POINT_AT_CHI_0_PSI_1,
    POINT_AT_CHI_1_PSI_1,
    toPrint,
} from './constants';
import Header from './components/Header';
import Divider from './components/Bits/Divider';
import Listing from './components/Listing/Listing.js';
import QuickControls from './components/Sidebars/QuickControls.js';
import AssetDisplay from './components/Sidebars/AssetDisplay';
import { Filter } from './components/Filters/FilterOptions';
import { attributeDisplay } from './components/Filters/FilterConfig';
import Filters from './components/Filters/Filters.js';
import SearchContainer from './components/SearchContainer.js';
import FilterContext, {
    FilterProvider,
} from './components/Context/FilterContext.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import ContentWrapper from './components/ContentWrapper.js';

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
        <AppWrapper>
            <FilterProvider>
                <GlobalStyles />
                <Header></Header>
                <QuickControls />
                <ContentWrapper>
                    <SearchContainer />
                    <SearchResults />
                </ContentWrapper>
                <AssetDisplay/>
            </FilterProvider>
        </AppWrapper>
    );
};
export default App;

const AppWrapper = styled.div`
    height: 100%;
    position:relative;
`;

// const ContentWrapper = styled.div`
//     padding: 15px;
//     background-color: var(--blackPurple);
//     min-width: 600px;
//     width: 55%;
//     margin: 0px 30% 0% 15%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: flex-start;
//     position: relative;
//     z-index: 0;
//     &.expanded {
//       margin: 0 30% 0 50px;
//       background-color:#000;
//     }
// `;
