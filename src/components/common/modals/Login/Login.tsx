import { useFormik } from "formik";
import Button from "../../Button/Button";
import Input from "../../form/Input/Input";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./Login.scss";
import OTPModal from "../OTPModal/OTPModal";
import { useState } from "react";
import Register from "../Register/Register";


const Login = ({ handleClose, show, }: CommonModalProps) => {
    const [showRegister, setShowRegister] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: values => {
            setShowOTP(true);
            handleClose && handleClose();
            console.log({ values });
        }
    })
    return (
        <>
            <Modal
                onHide={handleClose}
                className="login_modal"
                show={show}
            >
                <div className="modal_heading">
                    <h2>Login</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <Button fluid type="submit">Send Login Code</Button>
                    <p className="new_user">New User? <button onClick={() => { setShowRegister(true); handleClose && handleClose() }} type="button">Register</button></p>
                </form>
            </Modal>
            <OTPModal type="LOGIN" show={showOTP} handleClose={() => setShowOTP(false)} />
            <Register show={showRegister} handleClose={() => setShowRegister(false)} />
        </>
    )
}

export default Login
