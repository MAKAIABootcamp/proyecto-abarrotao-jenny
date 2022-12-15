import React, { useEffect } from "react";
import { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { actionGetGlocersAsync } from "../../redux/actions/glocersActions";
import MapLocation from "../Maps/Map";
import './home.scss';

const Home = () => {
    const { glocers } = useSelector((store) => store.glocerStore);
    const dispatch = useDispatch();
    const [location, setLocation] = useState(false)
    const navigate = useNavigate();
    let target;

    // const options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0
    // };

    // const success = (pos) => {
    //     const crd = pos.coords;

    //     console.log('Your current position is:');
    //     console.log(`Latitude : ${crd.latitude}`);
    //     console.log(`Longitude: ${crd.longitude}`);
    //     console.log(`More or less ${crd.accuracy} meters.`);
    // }

    // const error = (err) => {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }


    

    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    console.log(pos)

                    target = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                    console.log(target)
                    setLocation(true)
                    dispatch(actionGetGlocersAsync())

                }, (error) => {
                    console.log(error, 'error')
                    
                    
                }, { maximumAge: 0 });

        } else {
            alert('Please grant access to location')
        }

    }, [dispatch,navigator])


    return (
        <>
            <div className="home">
                {
                    location && glocers && glocers.length ? (
                        glocers.map((glocer, index) => (
                            <section key={index}>
                                <Card style={{ width: '18rem', height: '50%' }} onClick={() => { navigate(`/tienda${glocer.name}`); }}>
                                    <Card.Img variant="top" src={glocer.image} style={{ height: '10rem', objectFit: 'cover' }} className='imgCard' />
                                    <Badge bg="warning" text="dark">{glocer.name}</Badge>
                                    <Card.Body>
                                        <Card.Title>{glocer.seller}</Card.Title>
                                        <Card.Text>{`${glocer.description}`}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </section>
                        ))
                    ) : (<></>)
                }
                
            </div>
            
            <MapLocation location={location} />
            
        </>
    )
}

export default Home