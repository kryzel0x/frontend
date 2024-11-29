import { Col, Container, Row } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";
import { RightArrow } from "../../../assets/icons/icons";
import { ROUTES } from "../../../utils/constants";
import "./ErrorPage.scss";

interface RouterError {
    message: string;
    stack?: string;
}
const Errorpage = () => {
    const error = useRouteError() as RouterError | undefined;
    if (!error) {
        return null;
    }
    return (
        <section className={"error_page"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={12}>
                        <h3>Error  {error.stack?.split(":")[0]}</h3>
                        <h1>{error.message}</h1>
                        <p>{error.stack}</p>
                        <Link to={ROUTES.HOME}>Go Home <RightArrow /></Link>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Errorpage