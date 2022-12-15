import React, { useEffect } from "react";
import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionGetGlocersAsync } from "../../redux/actions/glocersActions";
import MapLocation from "../Maps/Map";
import './home.scss';

const Home = () => {
    const { glocers } = useSelector((store) => store.glocerStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(glocers);

    useEffect(() => {
        dispatch(actionGetGlocersAsync())
    }, [dispatch])

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(position.coords)
        // Show a map centered at latitude / longitude.
      });

    return (
        <>
            <div className="home">
                {
                    glocers && glocers.length ? (
                        glocers.map((glocer, index) => (
                            <section key={index}>
                                <Card  style={{ width: '18rem', height: '50%' }} onClick={() => { navigate(`/tienda${glocer.name}`); }}>
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
            <MapLocation />
        </>

    )
}
export default Home