import React, { useState } from "react";
import GeoJsonWithUpdates from "./GeoJsonWithUpdates";

export default function Line({ data, markers, setMarkers }) {
  let [color, setColor] = useState("red");

  if (data) {
    return (
      <GeoJsonWithUpdates
        pathOptions={{ color }}
        data={data}
        eventHandlers={{
          click: (e) => {
            let newMarkers = [...markers];
            newMarkers.push(e.latlng);
            setMarkers(newMarkers);
          }
        }}
      />
    );
  }
  return null;
}
