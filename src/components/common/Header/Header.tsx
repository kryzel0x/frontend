import { useEffect, useRef, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import coin from "../../../assets/icons/coin.png";
import profile from "../../../assets/images/profile.png";
import logo from "../../../assets/logo/logo.png";
import { ROUTES } from "../../../utils/constants";
import { clsx } from "../../../utils/utils";
import Button from "../Button/Button";
import Login from "../modals/Login/Login";
import "./Header.scss";

const Header = () => {
    const { pathname } = useLocation();
    const ref = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [scroll, setScroll] = useState(window.scrollY);
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])
    return (
        <header className={clsx("header", scroll > 0 && "scrolled")}>
            <Container>
                <div className="header_in">
                    <Link to={ROUTES.HOME} className="logo">
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="header_right">
                        {
                            false ?
                                <Button onClick={() => setShow(true)} className="login_btn">Login</Button>
                                :
                                <>
                                    <div className="header_nav">
                                        <ul>
                                            <li>
                                                <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={ROUTES.LEADERBOARDS}>Leaderboard</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            ref={ref}
                                            className={clsx("profile_btn", pathname.includes(ROUTES.PROFILE) && "active")}
                                            onClickCapture={() => {
                                                document.body.clientWidth > 991 &&
                                                    navigate(ROUTES.PROFILE)
                                            }}
                                        >
                                            <div>
                                                Shikher Saxena
                                                <p><img src={coin} alt="coin" />1199 KRZ</p>
                                            </div>
                                            <img src={profile} alt="profile" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <ul>
                                                <li>
                                                    <NavLink onClick={() => ref.current?.click()} to={ROUTES.PROFILE}>Profile</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink onClick={() => ref.current?.click()} to={ROUTES.DASHBOARD}>Dashboard</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink onClick={() => ref.current?.click()} to={ROUTES.LEADERBOARDS}>Leaderboard</NavLink>
                                                </li>
                                            </ul>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                        }
                    </div>
                </div>
            </Container>
            <Login show={show} handleClose={() => setShow(false)} />
        </header>
    )
}

export default Header
