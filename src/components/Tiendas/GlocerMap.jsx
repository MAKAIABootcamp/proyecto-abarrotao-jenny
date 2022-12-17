import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import { objInf } from "../../info";
import './tienda.scss'

const GlocerMap = ({coordinates,tienda}) => {
console.log(coordinates)

  return (
    <div className="mapContainer">
      {coordinates?
        (<GoogleMap zoom={16} center={{ lat: coordinates._lat, lng: coordinates._long}} mapContainerClassName="map-container">
          {/* {
            glocers.map((glocer, index) => (
              <Marker key={index} position={{ lat: glocer.location._lat, lng: glocer.location._long }} label={glocer.name} onClick={() => { navigate(`/tienda${glocer.name}`); }} />
            ))
          } */}

          <Marker position={{lat: coordinates._lat, lng: coordinates._long}} label={`Tienda ${tienda.name}`} />
        </GoogleMap>):<></> 
      }

    </div>
  )
}


const MapLocation = ({coordinates, tienda}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: objInf.API_KEY
  });  
  if (!isLoaded) return <div>Loading...</div>
  return <GlocerMap coordinates={coordinates} tienda={tienda}/>
};

export default MapLocation;