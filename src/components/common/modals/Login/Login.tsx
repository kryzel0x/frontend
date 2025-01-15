import { useState } from "react";
import { Link } from "react-router-dom";
import google from "../../../../assets/icons/google.svg";
import logo from "../../../../assets/logo/logo.png";
import { GOOGLE_CLIENT_ID } from "../../../../core/constants";
import useEphemeralKeyPair from "../../../../core/useEphemeralKeyPair";
import Button from "../../Button/Button";
import Modal, { CommonModalProps } from "../Modal/Modal";
import Register from "../Register/Register";
import "./Login.scss";

const Login = ({ handleClose, show }: CommonModalProps) => {
    const [showRegister, setShowRegister] = useState(false);
    const ephemeralKeyPair = useEphemeralKeyPair();

    // Build the Google OAuth redirect URL
    const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    const searchParams = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${window.location.origin}/`,
        response_type: "id_token",
        scope: "openid email profile",
        nonce: ephemeralKeyPair.nonce,
    });
    redirectUrl.search = searchParams.toString();

    return (
        <>
            <Modal onHide={handleClose} className="login_modal" show={show}>
                {/* <canvas id="custom_particles"></canvas> */}
                <div className="modal_heading">
                    <img src={logo} className="logo" alt="logo" />
                    {/* <h2>Login</h2> */}
                    <p className="desc_txt">AI-Powered Sports Prediction
                        Layer on Aptos</p>
                </div>
                <Button
                    fluid
                    className="google_btn"
                    onClick={() => {
                        window.location.href = redirectUrl.toString();
                    }}
                >
                    <img src={google} alt="Google" />{" "}
                    Continue with Google
                    {/* <div>
            Sign in with Google
            <span>Quick sign-in</span>
          </div> */}
                </Button>
                {/* <p className="policy_txt">
          By proceeding, I agree to <Link to="#">Terms of Use</Link> and{" "}
          <Link to="#">Privacy Policy</Link>
        </p> */}
            </Modal>
            <Register
                show={showRegister}
                handleClose={() => setShowRegister(false)}
            />
        </>
    );
};

export default Login;
