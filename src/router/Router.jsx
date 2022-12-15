import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { auth } from "../firebase/firebaseConfig";
import DashBoardRouter from "./DashBoardRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import Spinner from "react-bootstrap/Spinner";
import Navigationbar from "../components/nav/Navigationbar";
import { useDispatch, useSelector } from "react-redux";
import { actionLoginSync } from "../redux/actions/userActions";
import LoginWithPhone from "../components/LoginWithPhone";
import CodeVerificaction from "../components/CodeVerification";
import NavigationMenu from "../components/nav/NavigationMenu";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);  
  const [check, setCheck] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);

      } else {
        setIsLoggedIn(false);
      }
      setCheck(false)
      if (Object.entries(userStore).length === 0) {
        if (isLoggedIn) {

          const {
            displayName,
            email,
            phoneNumber,
            accessToken,
            photoURL,
            uid,
          } = user.auth.currentUser;
          dispatch(
            actionLoginSync({
              name: displayName,
              email,
              accessToken,
              phoneNumber,
              avatar: photoURL,
              uid,
              error: false,
            })
          );
        }
      }
    }

    );
  }, [setIsLoggedIn, dispatch, userStore,isLoggedIn]);

  if (check) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <BrowserRouter>
      <Navigationbar isAuthentication={isLoggedIn} />
      <NavigationMenu isAuthentication={isLoggedIn} />
      <Routes>
        <Route element={<PublicRouter isAuthentication={isLoggedIn} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/phoneLogin" element={<LoginWithPhone />} />
          <Route path="/verification" element={<CodeVerificaction />} />
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<PrivateRouter isAuthentication={isLoggedIn}/>}>
          <Route path="/*" element={<DashBoardRouter />} />
        </Route>
        {/* <Route path="*" element={<Nomtach/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
