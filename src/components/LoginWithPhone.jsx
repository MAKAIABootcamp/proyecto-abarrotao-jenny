import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import Swal from 'sweetalert2';
import { Button, FloatingLabel, Form } from "react-bootstrap";

const LoginWithPhone = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const validatePhoneNumber = (numberPhone, lengthString) => {
        if (!numberPhone) {
            return false;
        }

        const value = numberPhone.replace(/\D/g, "");
        const valueLength = value.length;
        return { isValid: valueLength === lengthString, value };
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, value: validNumber } = validatePhoneNumber(
            phoneNumber,
            10
        );
        console.log(isValid, validNumber);
        if (!isValid) {
            alert("el numero debe tener 10 caracteres");
        }
        generateReCaptcha();
        const recapcthaValue = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+57${validNumber}`, recapcthaValue)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
                navigate("/verification");
            })
            .catch((error) => {
                console.log(error);
                Swal.fire('Upps ', 'intenta de nuevo  ', 'error'

                )
                navigate("/")

            });
    };
    const generateReCaptcha = () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptch-container",
                {
                    size: "invisible",

                    callback: (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        // onSignInSubmit();
                        // console.log(response);
                    },
                },
                auth
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signin">
            <h2>SignIn </h2>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel label="Phone Number">
                    <Form.Control
                        type="number"
                        autoComplete="off"
                        placeholder="(+57) Enter your phone number"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                        value={phoneNumber}
                    />
                </FloatingLabel>
                {/* <label>
                    Phone number
                    <input
                        type="number"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                        value={phoneNumber}
                        placeholder=" + 57 Ingrese numero de telefono"
                    />
                </label> */}
                <div id="recaptch-container"> </div>
                <Button type="submit" className="mt-3 mb-3"> Sign in</Button>
            </Form>
        </div>
    );
}

export default LoginWithPhone;
