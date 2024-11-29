import { Container } from "react-bootstrap";
import quillAudits from "../../../assets/icons/quill-audit.png";
import nivapay from "../../../assets/icons/niva-pay.png";
import coinband from "../../../assets/icons/coinband.png";
import aptos from "../../../assets/icons/aptos.png"
import twitter from "../../../assets/icons/twitter.png"
import telegram from "../../../assets/icons/telegram.png"
import youtube from "../../../assets/icons/youtube.png"
import discord from "../../../assets/icons/discord.png"
import linkedin from "../../../assets/icons/linkedin.png"
import logo from "../../../assets/logo/logo.png";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { ROUTES, SOCIAL_MEDIA } from "../../../utils/constants";

const Footer = () => {
    const date = new Date();
    const menu = [
        { name: "Under Age", url: "#" },
        { name: "KYC", url: "#" },
        { name: "Self Exclusion", url: "#" },
        { name: "Responsible Gambling", url: "#" },
        { name: "T&C", url: "#" },
    ]
    const socialMedia = [
        { name: "twitter", icon: twitter, url: SOCIAL_MEDIA.TWITTER, },
        { name: "telegram", icon: telegram, url: SOCIAL_MEDIA.TELEGRAM, },
        { name: "youtube", icon: youtube, url: SOCIAL_MEDIA.YOUTUBE, },
        { name: "discord", icon: discord, url: SOCIAL_MEDIA.DISCORD, },
        { name: "linkedin", icon: linkedin, url: SOCIAL_MEDIA.LINKEDIN, },
    ]
    return (
        <footer className="footer">
            <Container>
                <div className="footer_in">
                    <div className="footer_left">
                        <Link to={ROUTES.HOME} className="logo"><img src={logo} alt="logo" /></Link>
                        <ul>
                            {socialMedia.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={item.url} target="_blank" rel="noreferrer">
                                            <img src={item.icon} alt={item.name} />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="footer_center">
                        <div className="powered_by">
                            <h3>Powered By</h3>
                            <img src={aptos} alt="aptos" />
                        </div>
                        <div className="partners">
                            <h3>Partners</h3>
                            <div className="partners_list">
                                <Link to=""><img src={quillAudits} alt="quill-audits" /></Link>
                                <Link to=""><img src={nivapay} alt="nivapay" /></Link>
                                <Link to=""><img src={coinband} alt="coinband" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer_right">
                        <ul>
                            {
                                menu.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={item.url}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <p className="footer_txt">
                    © All Rights Reserved {date.getFullYear()}
                </p>
            </Container>
        </footer>
    )
}

export default Footer
