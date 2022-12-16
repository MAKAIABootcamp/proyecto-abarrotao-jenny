import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FloatingLabel } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, dataBase } from "../../firebase/firebaseConfig";
// import { auth } from '../../firebase/firebaseConfig'
// import { useForm } from 'react-hook-form';
// import { schemaRegister } from '../../services/data';
// import { updateProfileAsync } from "../../redux/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const pos = {
          //     lat: position.coords.latitude,
          //     lng: position.coords.longitude,
          // };
          setLocation(true)
          // dispatch(actionGetGlocersAsync())

        }, (error) => {
          console.log(error, 'error')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Para usar la aplicación debe activar su localización',
            footer: `<a href="/home">Regresa a Home</a>`
          });

        }, { maximumAge: 0 });

    } else {
      alert('Please grant access to location')
    }

  }, [dispatch])
  const userStore = useSelector((store) => store.userStore);


  const [userInf, setUserInf] = useState({})


  let id = ''
  const searchInfo = async (uid) => {
    try {
      const docRef = doc(dataBase, "usuarios", uid)
      const docu = await getDoc(docRef)
      const dataFinal = docu.data()
      setUserInf({ ...dataFinal })
      return userInf
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfileAsync = async (email) => {
    try {
      const collectionU = collection(dataBase, 'usuarios')
      const q = query(collectionU, where("email", "==", email))
      const datosQ = await getDocs(q);
      datosQ.forEach((user) => {
        id = user.id
      })
      console.log(id)
      if (id !== '') {
        await searchInfo(id);
        return id
      }
      console.log(userInf);
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    updateProfileAsync(auth.currentUser.email)
  }, [])
  console.log(userInf);

  return (
    <div className="p-5">
      {
        location ? <div>
          <h1>Bienvenid@ {userInf.name}</h1>
        </div>:(navigate('/home'))
      }


    </div>
  )
}

export default Profile
