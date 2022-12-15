import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionGetGlocersAsync } from "../../redux/actions/glocersActions";
import './map.scss';

const Map = () => {

  const { glocers } = useSelector((store) => store.glocerStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(glocers);

  useEffect(() => {
    dispatch(actionGetGlocersAsync())
  }, [dispatch])


  const center = useMemo(() => ({ lat: 6.26110, lng: -75.61411 }), []);
  return (
    <div className="mapContainer">
      <GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
        {
          glocers.map((glocer, index) => (
            <Marker key={index} position={{ lat: glocer.location._lat, lng: glocer.location._long }} label={glocer.name} onClick={() => { navigate(`/tienda${glocer.name}`); }}/>
          ))
        }
      </GoogleMap>
    </div>
  )
}


const MapLocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBLlvfdP9jtmhZltElmOHzTFD_THtX67pQ'
  });
  if (!isLoaded) return <div>Loading...</div>
  return <Map />

};

export default MapLocation;



