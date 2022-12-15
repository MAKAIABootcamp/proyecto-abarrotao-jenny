import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { objInf } from "../../info";
import { actionGetGlocersAsync } from "../../redux/actions/glocersActions";
import './map.scss';

const Map = (  ) => {
  const { glocers } = useSelector((store) => store.glocerStore);
  const dispatch = useDispatch();
  const [local, setLocal] = useState(false)
  const navigate = useNavigate();
  const center =  {latitude: 0, longitude: 0};

  useEffect(() => {
    dispatch(actionGetGlocersAsync())
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(pos)          
          setLocal(true)
        }, (error) => {
          console.log(error, 'error');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Para usar la aplicación debe activar su localización',
            footer: `<a href="${navigate('/home')}">Why do I have this issue?</a>`
          });
          

        }, { maximumAge: 0 });

    } else {
      alert('Please grant access to location')
    }

  }, [dispatch])


  
  return (
    <div className="mapContainer">
      {
        local ? (<GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
          {
            glocers.map((glocer, index) => (
              <Marker key={index} position={{ lat: glocer.location._lat, lng: glocer.location._long }} label={glocer.name} onClick={() => { navigate(`/tienda${glocer.name}`); }} />
            ))
          }
          
          {/* <Marker position={{ lat: target.latitude, lng: target.longitude }} /> */}
        </GoogleMap>) : <></>
      }

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



