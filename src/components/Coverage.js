import React, { useRef, useEffect, useState } from 'react';

import Navbar from "./Navbar";
import Card from "./Card";
import Footer from "./Footer";
import axios from "axios"
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
import dota from "../data.json"
import CamaleonMap from './CamaleonMap';

function Coverage() {

    // mapboxgl.accessToken = 'pk.eyJ1Ijoib2Nhb2NhIiwiYSI6ImNsMDl0Y3NsNDA5MGMza3A2NTV2bnRxY3YifQ.jRQyayGms7Z0FHxISwuqwQ';
    // const mapContainer = useRef(null);
    // const map = useRef(null);
    // const [lng, setLng] = useState(-103.5917);
    // const [lat, setLat] = useState(40.6699);
    // const [zoom, setZoom] = useState(3);
    
    // // Getting the json data START
    const [data, setData] = useState(false)

    useEffect(() => {
        console.log("GETTING JSON DATA");
        /// Pedir el link
        const url = window.location.protocol + "//" + window.location.hostname+":8080/location-all"
        
        axios({
            method: "get",
            url:  url,
        })
            .then(function (response) {
                console.log("this onw is for the champion", response);
                setData( response.data )
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        console.log("HOLA THIS IS THE DATA TA:", data)
        console.log("HOLO THIS IS THE dota TA:", dota)
        
    },[data])
    // Getting the json data END

    // const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //     placeholder: "Ver con camaleón",
    //     marker: false
    // });
    
    // useEffect(() => {
    //     if (map.current) return; // initialize map only once
        
    //     map.current = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/dark-v10',
    //         center: [lng, lat],
    //         zoom: zoom
    //     });
    //     map.current.addControl(geocoder);
        
    //     map.current.on('load', () => {
    //         // Add a new source from our GeoJSON data and
    //         // set the 'cluster' option to true. GL-JS will
    //         // add the point_count property to your source data.
    //         map.current.addSource('earthquakes', {
    //             type: 'geojson',
    //             // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    //             // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    //             // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    //             data: data,
    //             cluster: true,
    //             clusterMaxZoom: 14, // Max zoom to cluster points on
    //             clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    //         });
             
    //         map.current.addLayer({
    //             id: 'clusters',
    //             type: 'circle',
    //             source: 'earthquakes',
    //             filter: ['has', 'point_count'],
    //             paint: {
    //                 // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    //                 // with three steps to implement three types of circles:
    //                 //   * Blue, 20px circles when point count is less than 100
    //                 //   * Yellow, 30px circles when point count is between 100 and 750
    //                 //   * Pink, 40px circles when point count is greater than or equal to 750
    //                 'circle-color': [
    //                     'step',
    //                     ['get', 'point_count'],
    //                     '#51bbd6',
    //                     100,
    //                     '#f1f075',
    //                     750,
    //                     '#f28cb1'
    //                 ],
    //                 'circle-radius': [
    //                     'step',
    //                     ['get', 'point_count'],
    //                     20,
    //                     100,
    //                     30,
    //                     750,
    //                     40
    //                 ]
    //             }
    //         });
             
    //         map.current.addLayer({
    //             id: 'cluster-count',
    //             type: 'symbol',
    //             source: 'earthquakes',
    //             filter: ['has', 'point_count'],
    //             layout: {
    //             'text-field': '{point_count_abbreviated}',
    //             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //             'text-size': 12
    //             }
    //         });
             
    //         map.current.addLayer({
    //             id: 'unclustered-point',
    //             type: 'circle',
    //             source: 'earthquakes',
    //             filter: ['!', ['has', 'point_count']],
    //             paint: {
    //                 'circle-color': '#11b4da',
    //                 'circle-radius': 4,
    //                 'circle-stroke-width': 1,
    //                 'circle-stroke-color': '#fff'
    //             }
    //         });
             
    //         // inspect a cluster on click
    //         map.current.on('click', 'clusters', (e) => {
    //             const features = map.current.queryRenderedFeatures(e.point, {
    //             layers: ['clusters']
    //         });
    //         const clusterId = features[0].properties.cluster_id;
    //         map.current.getSource('earthquakes').getClusterExpansionZoom(
    //             clusterId,
    //             (err, zoom) => {
    //                 if (err) return;
                    
    //                 map.current.easeTo({
    //                     center: features[0].geometry.coordinates,
    //                     zoom: zoom
    //                 });
    //             }
    //         );
    //         });
             
    //         // When a click event occurs on a feature in
    //         // the unclustered-point layer, open a popup at
    //         // the location of the feature, with
    //         // description HTML from its properties.
    //         map.current.on('click', 'unclustered-point', (e) => {
    //             const coordinates = e.features[0].geometry.coordinates.slice();
    //             const user = e.features[0].properties.user;
    //             const id = e.features[0].properties.id;
    //             const user_id = e.features[0].properties.user_id;
    //             const cam_title = e.features[0].properties.title
    //             // const tsunami =
    //             // e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
                
    //             // Ensure that if the map is zoomed out such that
    //             // multiple copies of the feature are visible, the
    //             // popup appears over the copy being pointed to.
    //             while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //                 coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //             }
                
    //             new mapboxgl.Popup()
    //             .setLngLat(coordinates)
    //             .setHTML(
    //                 `
    //                 <a href="./camaleon/${id}" target="_blank">
    //                   Ver camara: ${user} / ${cam_title}
    //                 </a>
    //                 `
    //             )
    //             .addTo(map.current);
    //         });
             
    //         map.current.on('mouseenter', 'clusters', () => {
    //             map.current.getCanvas().style.cursor = 'pointer';
    //         });
    //         map.current.on('mouseleave', 'clusters', () => {
    //             map.current.getCanvas().style.cursor = '';
    //         });
    //         });
    // });

    return (
        <div className=''>
            <Navbar />
            <br />
            <div className="camaleon container">
                <h1 className='view-title'>Coverage map</h1>
                <p>Click on the camara you want to see</p>
                
                {(data && data != false)?<CamaleonMap data={data}/>:<p>NO DATA</p>}
                
                {/* <div> */}
                    {/* <div ref={mapContainer} className="map-container" /> */}
                {/* </div> */}
            </div>
     
            <Footer />
        </div>
    );
    
}

export default Coverage;
