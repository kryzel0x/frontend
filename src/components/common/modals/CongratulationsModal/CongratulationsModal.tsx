import coin from "../../../../assets/icons/coin.png";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./CongratulationsModal.scss";


const CongratulationsModal = ({ handleClose, show }: CommonModalProps) => {
    return (
        <Modal
            onHide={handleClose}
            className="congratulations_modal"
            show={show}
        >
            <div className="modal_heading">
                <h2>Congratulations!</h2>
                <h2><span> Shikher Saxena</span></h2>
            </div>
            <h3>Your <span>Aptos wallet</span> has been created. <br />Here’s your <span>joining bonus</span> of</h3>
            <h4><img src={coin} alt="coin" /> 1500 KRZ</h4>
        </Modal>
    )
}

export default CongratulationsModal
