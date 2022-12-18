import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import { fileUpLoad } from "../../services/fileUpload";
import './profile.scss'
// import { auth } from '../../firebase/firebaseConfig'
import { useForm } from 'react-hook-form';
import { schemaRegister } from '../../services/data';
// import { updateProfileAsync } from "../../redux/actions/userActions";

const Profile = () => {

  let id = ''
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaRegister) });
  const [userInf, setUserInf] = useState({});
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

  }, [dispatch]);


  const searchInfo = async (uid) => {
    try {
      const docRef = doc(dataBase, "usuarios", uid)
      const docu = await getDoc(docRef)
      const dataFinal = docu.data()
      setUserInf({ ...dataFinal })
      console.log(setUserInf)
      return userInf
    } catch (error) {
      console.log(error)
    }
  };
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

  };

  const onUpLoadImage = async (image) => {
    const url = await fileUpLoad(image);
    if (url) {
      return url;
    } else {
      console.log("Ocurrió un error al cargar la imagen");
    }
  };
  const onSubmit = (data) => {
    // dispatch(actionLoginAsync(data))
    console.log(data)
  }

  useEffect(() => {
    updateProfileAsync(auth.currentUser.email)
  }, []);
  console.log(userInf);

  return (
    <>
      {
        location ?
          (
            <div className="profile">
              < div className="infUser" >
                <h4>{userInf.name}</h4>
                <section>
                  <img src={userInf.avatar} alt="user picture" />
                </section>

              </div>
              <div className='profileForm'>
              <h1>Actualiza tus datos</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel label="Name" className="mb-3">
                      <Form.Control
                        type="text"
                        value={userInf.name}
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
                        value={userInf.email}
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
                        type="text"
                        placeholder="Celular"
                        value={userInf.phoneNumber}
                        {...register("phone")}
                      />
                      <Form.Text className="text-muted">
                        {errors.phone?.message}
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel label="Password" className="mb-3">
                      <Form.Control
                        type="password"
                        value={userInf.password}
                        placeholder="Password"
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
                    Register
                  </Button>
                </Form>
              </div>

            </div>)
          :
          (navigate('/home'))
      }

    </>
  )
}

export default Profile
