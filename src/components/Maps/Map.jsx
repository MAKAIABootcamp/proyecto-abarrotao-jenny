import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase/firebaseConfig";
import { objInf } from "../../info";
import { actionGetGlocersAsync } from "../../redux/actions/glocersActions";
import './map.scss';

const Map = () => {
  const { glocers } = useSelector((store) => store.glocerStore);
  const {reloadUserInfo: user}= auth.currentUser
  console.log(user)
  const dispatch = useDispatch();
  const [local, setLocal] = useState(false)
  const navigate = useNavigate();
  let center = { lat: 6.2608711, lng: -75.6163372 };

  useEffect(() => {
    dispatch(actionGetGlocersAsync())
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          center = {
            ...position,
            lat: pos.lat,
            lng: pos.lng
          }
          console.log(center)
          setLocal(true)
        }, (error) => {
          console.log(error, 'error');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Para usar la aplicación debe activar su localización',
            footer: `<a href="/home">Regresa a Home</a>`
          });
          // window.location.reload();


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

          <Marker position={{ lat: center.lat, lng: center.lng }} label={user.displayName} onClick={() => { navigate('/perfil'); }}/>
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



