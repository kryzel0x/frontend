import { useState } from "react";
import aptos from "../../../../assets/icons/aptos.png";
import Button from "../../Button/Button";
import CongratulationsModal from "../CongratulationsModal/CongratulationsModal";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./CreateWalletStartModal.scss";


const CreateWalletStartModal = ({ handleClose, show, }: CommonModalProps) => {
    const [showCong, setShowCong] = useState(false);
    return (
        <>
            <Modal
                onHide={handleClose}
                className="create_wallet_modal"
                show={show}
                hideCloseBtn
            >
                <h3>Powered By</h3>
                <img className="powered_by_pic" src={aptos} alt="aptos" />
                <h2>Create your wallet to start investing Revenue pool </h2>
                <Button onClick={() => { setShowCong(true); handleClose && handleClose(); }} fluid>Submit</Button>
            </Modal>
            <CongratulationsModal show={showCong} handleClose={() => setShowCong(false)} />
        </>
    )
}

export default CreateWalletStartModal
