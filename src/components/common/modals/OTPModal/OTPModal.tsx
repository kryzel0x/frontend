import { FormEvent, useState } from "react";
import OTPInput from "react-otp-input";
import { useTimer } from 'react-timer-hook';
import Button from "../../Button/Button";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./OTPModal.scss";
import CreateWalletStartModal from "../CreateWalletStartModal/CreateWalletStartModal";


const OTPModal = ({ handleClose, show, type, }: CommonModalProps & { type?: "LOGIN" | "REGISTER", }) => {
    const [otp, setOtp] = useState('');
    const [showDone, setShowDone] = useState(false);

    const { seconds, restart } = useTimer({ expiryTimestamp: new Date(Date.now() + 60000), onExpire: () => console.warn('onExpire called') });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === "REGISTER") {
            setShowDone(true);
            handleClose && handleClose();
        }
    }
    return (
        <>
            <Modal
                onHide={handleClose}
                className="otp_modal"
                show={show}
            >
                <div className="modal_heading">
                    <h2>Enter {type === "LOGIN" ? "Login" : "Signup"} Code</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="otp_input">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderInput={(props) => <input {...props}
                                inputMode="numeric"
                                pattern="\d*" type="number" />}
                        />
                    </div>
                    <Button fluid type="submit">Submit</Button>
                    {
                        seconds === 0 ?
                            <p className="timer_txt resend_txt">
                                Didn’t receive? <button onClick={() => restart(new Date(Date.now() + 60000))} type="button">Resend</button>
                            </p>
                            :
                            <p className="timer_txt">00 : {seconds < 10 && "0"} {seconds}</p>
                    }
                </form>
            </Modal>
            <CreateWalletStartModal show={showDone} handleClose={() => setShowDone(false)} />
        </>
    )
}

export default OTPModal
