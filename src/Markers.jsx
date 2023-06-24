import icon from "./constants";
import { Marker } from "react-leaflet";

export default function Markers({ markers }) {
  if (markers.length > 0) {
    return markers.map((position, id) => {
      return <Marker key={id} icon={icon} position={position}></Marker>;
    });
  }
  return null;
}
