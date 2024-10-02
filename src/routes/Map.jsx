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
            style: 'mapbox://styles/mapbox/dark-v11?optimize=true',
            center: [-104.9903, 39.7392],
            zoom: 5,
            maxZoom: 17,
            minZoom: 4,
        });



        mapRef.current.on('load', () => {
            mapRef.current.addSource('activites', {
                type: 'geojson',
                data: '../conversions/outputs/combined.geojson'
            });

            mapRef.current.addLayer(
                {
                    id: 'activites-heat',
                    type: 'heatmap',
                    source: 'activites',

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
                            12,
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
                            2
                        ],
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0.,
                            'rgba(1,32,48,0)',
                            0.25,
                            'rgba(19,103,138,54)',
                            0.50,
                            'rgba(69,196,176,77)',
                            0.75,
                            'rgba(154,235,163,92)',
                            1,
                            'rgba(218,253,186,99)',
                        ],
                        // Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            4,
                            8,
                            9,
                            2
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0.8, 20, 0.2]
                    }
                },
                'waterway-label'
            );
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.on('zoom', () => {
                setZoom(mapRef.current.getZoom());
            });
        }
    }, [mapRef]);

    return <div className="h-screen">
        <div id="map" ref={mapContainerRef} style={{ height: '100%' }}>
            <div className='absolute z-50 top-0 right-0 text-3xl'>
                <p className='text-white text-3xl'>zoom: {zoom}</p>
            </div>
        </div>
    </div>;
};

export default Map;