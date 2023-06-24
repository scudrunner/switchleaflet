import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import bbox from "@turf/bbox";
import Select from "./Select";

import "leaflet/dist/leaflet.css";
import Markers from "./Markers";
import Line from "./Line";

function Map() {
  // state for initial map loading
  let [map, setMap] = useState(null);
  // states for geojson data, bounds, markers, and document queries
  let [data, setData] = useState(null);
  let [bounds, setBounds] = useState(null);
  let [featureNum, setFeatureNum] = useState(1);
  // some random markers simulating placed markers on map
  let [markers, setMarkers] = useState([
    [27.147144835991796, 31.530761718750004],
    [28.844673680771795, 33.662109375],
    [26.86328062676624, 35.804443359375]
  ]);

  // ref to the feature group used to clear layers
  let featureGroupRef = useRef();

  // fetch the data from the "database" async
  let getData = async () => {
    const response = await fetch(`/feature${featureNum}.geojson`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getData().then((receivedData) => {
      // calculate bounding box using turf before setting bounds on map
      const bboxArray = bbox(receivedData);
      const corner1 = [bboxArray[1], bboxArray[0]];
      const corner2 = [bboxArray[3], bboxArray[2]];
      const bounds = [corner2, corner1];

      if (map) {
        // clear layers
        // featureGroupRef.current.clearLayers();
        setMarkers([]);

        // fly to new bounds since MapContainer bounds immutable
        map.flyToBounds(bounds);
        // featuregroupref.current.bringToFront();
      } else {
        setBounds(bounds);
      }
      // set the data for Line component
      setData(receivedData);
      console.log(`document ${featureNum} received`);
    });
  }, [featureNum]);

  if (!bounds) {
    return <> Loading...</>;
  }

  return (
    <div>
      <Select setFeatureNum={setFeatureNum} />
      <MapContainer
        zoom={13}
        bounds={bounds}
        style={{ height: "50vh", width: "100vw" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup ref={featureGroupRef}>
          <Line data={data} markers={markers} setMarkers={setMarkers} />
          <Markers markers={markers}></Markers>
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default Map;
