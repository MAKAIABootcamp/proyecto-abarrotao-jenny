import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebaseConfig'
import { useForm } from 'react-hook-form';
import { schemaRegister } from '../../services/data';

const Profile = () => {
    // const { reloadUserInfo: user } = auth.currentUser
    // const infUser = user.providerUserInfo[0]
    const userStore = useSelector((store) => store.userStore);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaRegister),
      });
    console.log(auth);
    return (
        <div className="p-5">
            <h1>Crear una nueva cuenta</h1>
            {/*  */}
        </div>
    )
}

export default Profile
