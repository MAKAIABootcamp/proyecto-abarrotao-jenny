import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dataBase } from '../../firebase/firebaseConfig';

const Glocer = ({ glocerName }) => {
  console.log(glocerName);
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
  return (
    <div className='glocerContainer'>
      {
        location && glocerInf ?
          <div>
            hola
          </div>
          :
          (navigate('/home'))
      }

    </div>
  )
}

export default Glocer
