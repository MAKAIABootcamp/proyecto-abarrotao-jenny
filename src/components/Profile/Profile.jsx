import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FloatingLabel } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { useSelector } from 'react-redux';
import { auth, dataBase } from "../../firebase/firebaseConfig";
// import { auth } from '../../firebase/firebaseConfig'
// import { useForm } from 'react-hook-form';
// import { schemaRegister } from '../../services/data';
// import { updateProfileAsync } from "../../redux/actions/userActions";

const Profile = () => {
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

      }
      <h1>Bienvenid@</h1>

    </div>
  )
}

export default Profile
