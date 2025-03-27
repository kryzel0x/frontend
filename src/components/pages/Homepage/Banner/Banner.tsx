import { Container } from "react-bootstrap";
import leaderboardGradient from "../../../../assets/images/leaderboard-head-gradient.png";
import Button from "../../../common/Button/Button";
import "./Banner.scss";
import { useState } from "react";
import Login from "../../../common/modals/Login/Login";

const Banner = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <section className="banner_design">
                <Container fluid>
                    <div className="banner_in">
                        <h2>
                            World’s First AI-Powered Decentralized <br />
                            Sports Prediction Protocol
                        </h2>
                        <h1>
                            Start Your <br />
                            <span>Journey Now!</span>
                        </h1>
                        <Button className="dark_btn" onClick={() => window.open("https://t.me/KryzelCommunity", "_blank")}>
                            <span>
                                Join Our Community
                            </span>
                        </Button>
                        <Login show={show} handleClose={() => setShow(false)} />
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <img src={leaderboardGradient} alt="gradient" className="leader_board_gradient" />
                </Container>
            </section>
        </>
    )
}

export default Banner
