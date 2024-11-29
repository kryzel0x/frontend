import { useFormik } from "formik";
import { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../form/Input/Input";
import Modal, { CommonModalProps } from "../Modal/Modal";
import OTPModal from "../OTPModal/OTPModal";
import "./Register.scss";


const Register = ({ handleClose, show, }: CommonModalProps) => {
    const [_show, setShowLogin] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            fullName: "",
        },
        onSubmit: () => {
            setShowOTP(true);
            handleClose && handleClose();
        }
    })
    return (
        <>
            <Modal
                onHide={handleClose}
                className="register_modal"
                show={show}
            >
                <div className="modal_heading">
                    <h2>Create Profile</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name="fullName"
                        placeholder="Enter Full Name"
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <Button fluid type="submit">Create</Button>
                    <p className="new_user">Already a user? <button onClick={() => { setShowLogin(true); handleClose && handleClose() }} type="button">Login</button></p>
                </form>
            </Modal>
            <OTPModal type="REGISTER" show={showOTP} handleClose={() => setShowOTP(false)} />
            {/* <Login show={showLogin} handleClose={() => setShowLogin(false)} /> */}
        </>
    )
}

export default Register
