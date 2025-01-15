import { Col, Container, Row } from "react-bootstrap";
import rob from "../../../../assets/icons/features/ai-powered.svg"
import rocket from "../../../../assets/icons/features/launch-your-bet.svg"
import usdt from "../../../../assets/icons/features/unified-liquidity.svg"
import wallet from "../../../../assets/icons/features/fast-payout.svg"
import "./Features.scss";

const Features = () => {
    return (
        <section className="features_design">
            <Container>
                <h2 className="title_txt">Features</h2>
                <Row>
                    <Col md={3}>
                        <div className="feature_box">
                            <span><img src={rocket} alt="rocket" /></span>
                            <h3>Launch your Sports prediction app in 3 minutes</h3>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="feature_box">
                            <span><img src={usdt} alt="rocket" /></span>
                            <h3>Unified Liquidity</h3>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="feature_box">
                            <span><img src={wallet} alt="rocket" /></span>
                            <h3>Fast Payout</h3>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="feature_box">
                            <span><img src={rob} alt="rocket" /></span>
                            <h3>AI Powered risk management</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Features
