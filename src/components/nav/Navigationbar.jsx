import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionLogoutAsync } from "../../redux/actions/userActions";
import logoHeader from '../../assets/abarrotados-logo2.jpeg'
import './navbar.scss';



const Navigationbar = ({ isAuthentication }) => {
  const dispatch = useDispatch();
  let id;
  let target;
  let options;

  const logOut = () => {
    function success(pos) {
      const crd = pos.coords;
      console.log(crd)
      target = {
        latitude: crd.latitude,
        longitude: crd.longitude,
      };

      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        console.log('Felicidades, has llegado a tu destino.');
        navigator.geolocation.clearWatch(id);
        console.log(crd)
      }
    };

    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    };

    target = {
      latitude: 0,
      longitude: 0,
    }

    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(success, error, options);



    dispatch(actionLogoutAsync());
  };
  return (
    <Navbar expand="md" className="mb-3 navbar">
      <Container fluid>
        <img src={logoHeader} alt='Abarrotado Logo' className="imgLogoNav" />
        <div className="appName"><h2 >Abarrotado</h2></div>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"md"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
          placement="end"
        >
          <Offcanvas.Body>
            {isAuthentication ? (
              <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 m-3">
                <NavLink to="/home" className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink '}>Home</NavLink>
                <button onClick={logOut}>Logout</button>
              </Nav>
            ) : (
              <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 m-3">
                <NavLink to="/" className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink '}>Login</NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink '}>Register</NavLink>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
