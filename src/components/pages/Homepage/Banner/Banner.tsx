import { Container } from "react-bootstrap";
import Button from "../../../common/Button/Button";
import "./Banner.scss";
import { useState } from "react";
import Login from "../../../common/modals/Login/Login";

const Banner = () => {
    const [show, setShow] = useState(false);
    return (
        <section className="banner_design">
            <Container>
                <div className="banner_in">
                    <h2>
                        World's First AI-Powered
                        <span>Decentralized</span>
                        Sports Betting Protocol
                    </h2>
                    <h1>Start earning now!</h1>
                    <Button onClick={() => setShow(true)}>Join Now</Button>
                    <Login show={show} handleClose={() => setShow(false)} />
                </div>
            </Container>
        </section>
    )
}

export default Banner
