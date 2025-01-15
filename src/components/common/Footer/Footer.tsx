import logo from "../../../assets/logo/logo.png";
import { Container } from "react-bootstrap"
import { SOCIAL_MEDIA } from "../../../utils/constants";
import telegram from "../../../assets/icons/telegram.svg"
import twitter from "../../../assets/icons/twitter.svg"
import linkedin from "../../../assets/icons/linkedin.svg"
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <div className="footer_in">
                    <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
                    {/* <Link to="/" className="terms">Terms & Conditions </Link> */}
                    <div className="footer_right">
                        <h3>Follow us on</h3>
                        <Link to={SOCIAL_MEDIA.TELEGRAM} target="_blank"><img src={telegram} alt="telegram" /></Link>
                        <Link to={SOCIAL_MEDIA.TWITTER} target="_blank"><img src={twitter} alt="twitter" /></Link>
                        <Link to={SOCIAL_MEDIA.LINKEDIN} target="_blank"><img src={linkedin} alt="linkedin" /></Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
