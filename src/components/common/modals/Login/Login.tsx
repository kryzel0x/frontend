import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  // Build the Google OAuth redirect URL
  const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  const googleSearchParams = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/`,
    response_type: "id_token",
    scope: "openid email profile",
    nonce: ephemeralKeyPair.nonce,
    state: referralCode || ""
  });
  redirectUrl.search = googleSearchParams.toString();
  

  return (
    <>
      <Modal onHide={handleClose} className="login_modal" show={show}>
        <div className="modal_heading">
          <img src={logo} className="logo" alt="logo" />
          <p className="desc_txt">
            AI-Powered Sports Prediction Layer on Aptos
          </p>
        </div>
        <Button
          fluid
          className="google_btn"
          onClick={() => {
            window.location.href = redirectUrl.toString();
          }}
        >
          <img src={google} alt="Google" /> Continue with Google
        </Button>
      </Modal>
      <Register
        show={showRegister}
        handleClose={() => setShowRegister(false)}
      />
    </>
  );
};

export default Login;
