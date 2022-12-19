import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import { fileUpLoad } from "../../services/fileUpload";
import './profile.scss'
// import { auth } from '../../firebase/firebaseConfig'
import { useForm } from 'react-hook-form';
import { schemaUpdate } from '../../services/data';
import { updateUserAsync } from "../../redux/actions/userActions";
// import { updateProfileAsync } from "../../redux/actions/userActions";

const Profile = () => {

  let id = ''
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaUpdate) });
  // const [userInf, setUserInf] = useState({});
  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          };
         
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

  }, [dispatch]);

  const user = useSelector(store => store.userStore)
  console.log(user)

  const onUpLoadImage = async (image) => {
    const url = await fileUpLoad(image);
    if (url) {
      return url;
    } else {
      console.log("Error en url imagen");
    }
  };
  const onSubmit =  async(data) => {
    console.log(data);
    if (data.image.length === 1) {
      
      const image = await onUpLoadImage(data.image[0]);
      const userUpdated = {
        name: data.name,
        email: user.email,
        avatar: image,
        phoneNumber: data.phone,
        password: data.password
      }
      dispatch(updateUserAsync(userUpdated));
      console.log(user)
      // navigate('/perfil')
    }
  }

  // useEffect(() => {
  //   getProfileAsync(user.email)
  // }, [auth]);


  return (
    <div>
      {
        location ?
          (
            <div className="profile">
              < div className="infUser" >
                <h4>{user.name}</h4>
                <section>
                  <img src={user.avatar} alt="user picture" />
                </section>

              </div>
              <div className='profileForm'>
                <h4>Actualiza tus datos</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel label="Name" className="mb-3">
                      <Form.Control
                        type="text"
                       value={user.name}
                        placeholder="Name"
                        {...register("name")}
                      />
                      <Form.Text className="text-muted">{errors.name?.message}</Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel label="Email address" className="mb-3">
                      <Form.Control
                        type="email"
                        // disabled
                        value={user.email}
                        placeholder="Email"
                        {...register("email")}
                        
                      />
                      <Form.Text className="text-muted">
                        {errors.email?.message}
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel label=" Phone number" className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Celular"
                        {...register("phone")}
                      />
                      <Form.Text className="text-muted">
                        {errors.phone?.message}
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel label="New Password" className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        {...register("password")}
                      />
                      <Form.Text className="text-muted">
                        {errors.password?.message}
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel label="Avatar" className="mb-3">
                      <Form.Control type="file" size="sm" {...register("image")} />
                    </FloatingLabel>
                  </Form.Group>
                  <Button variant="warning" type="submit">
                    Actualizar
                  </Button>
                </Form>
              </div>

            </div>)
          :
          (navigate('/home'))
      }

    </div>
  )
}

export default Profile
