import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useMemo } from "react";
import { objInf } from "../../info.js";
import './map.scss';


const Map = () => {
  const center = useMemo(() => ({ lat: 6.26110, lng: -75.61411 }), []);
  return (
    <div className="mapContainer">
      <GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
        <Marker position={{ lat: 6.2598448, lng: -75.6137205 }} />
      </GoogleMap>
    </div>
  )
}


const MapLocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: objInf.API_KEY
  });
  if (!isLoaded) return <div>Loading...</div>
  return <Map />

};

export default MapLocation;



