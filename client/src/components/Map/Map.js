import React, { useRef, useState, useEffect } from 'react';
import './Map.css';
import MapContext from './MapContext';
import * as ol from 'ol';
import { fromLonLat, toLonLat, get } from 'ol/proj';
import Extent from 'ol/extent'

const Map = ({ children, zoom, center, rotation }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    // on component mount
    useEffect(() => {
        //openlayers map object to be applied to DOM element
        let options = {
            //store some options
            view: new ol.View({
                zoom,
                center,
                // TL[-8190390.92229111, 5718720.025639196],
                // TR[-8180022.1271212865, 5712037.323447103]
                // BR[-8192564.639805884, 5692605.003275052],
                // BL-8202924.64513574, 5699272.861729206
                rotation,
                padding: [0, 0, 0, 0],
                zoomFactor: 1.01,
                minZoom:835,
                maxZoom:835,
                
            }),
            layers: [],
            controls: [],
            overlays: [],
        };
        let mapObject = new ol.Map(options); //use them to create map object
        mapObject.setTarget(mapRef.current); //setTarget applies map object to DOM element
        mapObject.on('click', (mapEv) => {
            console.log(`❗ Map.js:20 'mapEv' <${typeof mapEv}>`, mapEv);
            console.log(
                `❗ Map.js:21 'mapEv.coordinate' <${typeof mapEv.coordinate}>`,
                mapEv.coordinate
            );
            console.log(`❗ Map.js:40 'toLonLat(mapEv.coordinate)' <${typeof toLonLat(mapEv.coordinate)}>`,toLonLat(mapEv.coordinate));
        });
        setMap(mapObject); //store mapobject which is passed as value to MapContext.Provider and causes rerenders

        return () => mapObject.setTarget(undefined); //cleanup
    }, []);
    // zoom change handler
    useEffect(() => {
        if (!map) return;
        map.getView().setZoom(zoom);
    }, [zoom]);
    // // center change handler
    useEffect(() => {
        if (!map) return;
        map.getView().setCenter(center);
    }, [center]);
    return (
        <MapContext.Provider value={{ map }}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    );
};
export default Map;

////with thanks to https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744
