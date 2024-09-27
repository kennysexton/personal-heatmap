import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-104.9903, 39.7392],
            zoom: 2
        });



        mapRef.current.on('load', () => {
            mapRef.current.addSource('earthquakes', {
                type: 'geojson',
                // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
                data: '../activity_data/output.geojson'
            });

            mapRef.current.addLayer(
                {
                    id: 'earthquakes-heat',
                    type: 'heatmap',
                    source: 'earthquakes',
                    maxzoom: 20,
                    paint: {
                        // Increase the heatmap weight based on frequency and property magnitude
                        // A measure of how much an individual point contributes to the heatmap. 
                        // A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.
                        'heatmap-weight': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            0,
                            0,
                            6,
                            1
                        ],
                        // Increase the heatmap color weight weight by zoom level
                        // heatmap-intensity is a multiplier on top of heatmap-weight
                        'heatmap-intensity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            1,
                            1,
                            9,
                            3
                        ],
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(33,102,172,0)',
                            0.2,
                            'rgb(103,169,207)',
                            0.4,
                            'rgb(209,229,240)',
                            0.6,
                            'rgb(253,219,199)',
                            0.8,
                            'rgb(239,138,98)',
                            1,
                            'rgb(178,24,43)'
                        ],
                        // Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            1,
                            1,
                            9,
                            8
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0.8, 20, 0.2]
                    }
                },
                'waterway-label'
            );

            //   mapRef.current.addLayer(
            //     {
            //       id: 'earthquakes-point',
            //       type: 'circle',
            //       source: 'earthquakes',
            //       minzoom: 7,
            //       paint: {
            //         // Size circle radius by earthquake magnitude and zoom level
            //         'circle-radius': [
            //           'interpolate',
            //           ['linear'],
            //           ['zoom'],
            //           7,
            //           ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
            //           16,
            //           ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
            //         ],
            //         // Color circle by earthquake magnitude
            //         'circle-color': [
            //           'interpolate',
            //           ['linear'],
            //           ['get', 'mag'],
            //           1,
            //           'rgba(33,102,172,0)',
            //           2,
            //           'rgb(103,169,207)',
            //           3,
            //           'rgb(209,229,240)',
            //           4,
            //           'rgb(253,219,199)',
            //           5,
            //           'rgb(239,138,98)',
            //           6,
            //           'rgb(178,24,43)'
            //         ],
            //         'circle-stroke-color': 'white',
            //         'circle-stroke-width': 1,
            //         // Transition from heatmap to circle layer by zoom level
            //         'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
            //       }
            //     },
            //     'waterway-label'
            //   );
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.on('zoom', () => {
                setZoom(mapRef.current.getZoom());
            });
        }
    }, [mapRef]);

    return <div id="map" ref={mapContainerRef} style={{ height: '100%' }}>
        <div className='absolute z-50 top-0 right-0 text-3xl'>
            <p className='text-white text-3xl'>zoom: {zoom}</p>
        </div>
    </div>;
};

export default Map;