import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataBase } from '../../firebase/firebaseConfig';
import MapLocation from './GlocerMap';
import './tienda.scss';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from 'react-bootstrap/Badge';
import { FloatingLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaTurnos } from '../../services/data';
import { actionGetTurnosAsync } from '../../redux/actions/turnosActions';


const Glocer = ({ glocerName }) => {
  const { turnos } = useSelector((store) => store.turnoStore);
  console.log(turnos)
  console.log(glocerName);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false)
  const { register, handleSubmit, formState: { errors },reset } = useForm({ resolver: yupResolver(schemaTurnos) });
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
    dispatch(actionGetTurnosAsync());
  }, [dispatch])

  const [glocerInf, setGlocerInf] = useState({})
  let id = ''
  const getGlocerInfo = async (uid) => {
    try {
      const docRef = doc(dataBase, "tiendas", uid)
      const docu = await getDoc(docRef)
      const dataFinal = docu.data()
      setGlocerInf({ ...dataFinal })
      return glocerInf
    } catch (error) {
      console.log(error)
    }
  }

  const getGlocerAsync = async (name) => {
     
    try {
      const collectionU = collection(dataBase, 'tiendas')
      const q = query(collectionU, where("name", "==", name))
      const datosQ = await getDocs(q);
      datosQ.forEach((user) => {
        id = user.id
        console.log(id)
      })
      console.log(id)
      if (id !== '') {
        await getGlocerInfo(id);
        return id
      }
      console.log(glocerInf);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getGlocerAsync(glocerName)
  }, [])
  console.log(glocerInf);

  const onSubmit = (data) => {
    console.log(data.hora.value);
    if (data.hora == '0') {
      Swal.fire(
        'Reserva fallida',
        'Seleccione la hora',
        'error'
      )
      return
      
    }
    if (data.minutos == '0') {
      Swal.fire(
        'Reserva fallida',
        'Seleccione los minutos',
        'error'
      )
      return
      
    }
    else {
      Swal.fire(
        'Excelente!',
        'Tu turno ha sido agendado!',
        'success'
      );
      // (navigate(`/tienda/:${glocerInf.name}`))
      console.log(data)
      reset()      
     
    }
  }
  // dispatch(actionAddUsersAsync(newUser));
  



  // dispatch(actionRegisterAsync(newUser));
  // dispatch(actionAddUsersAsync(newUser));

  return (
    <div className='glocerContainer'>
      {
        location && glocerInf ?
          <div className='glocerWrapper'>
            <aside>
              <h5>
                <Badge bg="info">Reserva tu turno en {glocerName}</Badge>
              </h5>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Select className="mb-3" aria-label="Default select example"
                  {...register("hora")}>
                  <option value="0">Selecciona la hora</option>
                  <option value="8:00">8:00</option>
                  <option value="9:00">9:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  
                </Form.Select>
                <Form.Select className="mb-3" aria-label="Default select example" {...register("minutos")}>
                  <option value="0">Selecciona los minutos</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </Form.Select>
                <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Escribe tu lista de compras">
                  <Form.Control
                    as="textarea"
                    placeholder="Escribe tu lista de compras"
                    style={{ height: '100px' }}
                    {...register("lista")}
                  />
                  <Form.Text className="text-muted">
                    {errors.lista?.message}
                  </Form.Text>
                </FloatingLabel>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </aside>
            <section>
              <h5>
                <Badge bg="info">Observa el flujo de clientes</Badge>
              </h5>
              <MapLocation coordinates={glocerInf.location} tienda={glocerInf} />
            </section>
          </div>
          
          :
          (navigate('/home'))
      }

    </div>
  )
}

export default Glocer
