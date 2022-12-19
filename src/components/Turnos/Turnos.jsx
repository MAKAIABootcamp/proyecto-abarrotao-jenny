import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Badge, Card } from "react-bootstrap";
import turnoImg from '../../assets/turno.jpg';
import './turnos.scss'
import { actionGetTurnosAsync } from '../../redux/actions/turnosActions';

const Turnos = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false)
  // console.log(turnos)

  useEffect(() => {

    dispatch(actionGetTurnosAsync());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const pos = {
          //     lat: position.coords.latitude,
          //     lng: position.coords.longitude,
          // };
          setLocation(true)
          // dispatch(actionGetGlocersAsync())

        }, (error) =>  {
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

  }, [actionGetTurnosAsync])
  const { turnos } = useSelector((store) => store.turnoStore);
  console.log(turnos)
  return (    
    <div className='turnosMain' >
      {
        location ? (
          turnos.map((turno, index) => ((            
              <section key={index} >                  
                  <Card style={{ width: '18rem', height: '50%' }} >
                      <Card.Img variant="top" src={turnoImg} style={{ height: '10rem', objectFit: 'cover' }} className='imgCard'  />
                      <Badge bg="warning" text="dark">{turno.userName}</Badge>
                      <Card.Body>
                          <Card.Title>{`Horario ${turno.hour}:${turno.minutes} en ${turno.glocerName}`}</Card.Title>
                          <Card.Text>{`Compras: ${turno.list}`}</Card.Text>
                      </Card.Body>
                  </Card>
              </section>)
          ))
      ) : (<></>)
      }
    </div>
  )
}

export default Turnos