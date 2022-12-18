import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataBase } from '../../firebase/firebaseConfig';
import { Badge, Card } from "react-bootstrap";


const Turnos = () => {
  const { turnos } = useSelector((store) => store.turnoStore);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false)
  const [tienda, setTienda] = useState({})

  const getTurnoInfo = async (uid) => {
    try {
      const docRef = doc(dataBase, "turnos", uid)
      const docu = await getDoc(docRef)
      const dataFinal = docu.data()
      setTienda( dataFinal )
      return tienda
    } catch (error) {
      console.log(error)
    }
  }

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
  return (    
    <div >
      {
        location ? (
          turnos.map((turno, index) => ((
            
              <section key={index} >                  
                  <Card style={{ width: '18rem', height: '50%' }} >
                      <Card.Img variant="top" src='' style={{ height: '10rem', objectFit: 'cover' }} className='imgCard'  />
                      <Badge bg="warning" text="dark"></Badge>
                      <Card.Body>
                          <Card.Title>{`Horario ${turno.hour}:${turno.minutes}`}</Card.Title>
                          <Card.Text>{`${turno.list}`}</Card.Text>
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