import { Container } from "react-bootstrap";
import logo from "../../../assets/logo/small-logo.png"
import "./RegisterationProcess.scss";
import Spinner from "../../common/Spinner/Spinner";

const RegisterationProcess = () => {
    return (
        <>
            <section className="register_process">
                <Container>
                    <div className="page_in">
                        <img src={logo} className="logo" alt="logo" />
                        <h2>Creating Your Account</h2>
                        <p className="desc">This is usually very quick, but could take up to 1 minute.</p>
                        <ul>
                            <li>
                                <Spinner />
                                Generating a aptos keyless account
                            </li>
                            <li>
                                <Spinner />
                                Creating wallet from aptos keyless account
                            </li>
                            <li>
                                <Spinner />
                                Finalising your aptos wallet
                            </li>
                        </ul>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default RegisterationProcess;
