import Button from "../../Button/Button";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./LogoutModal.scss";

const LogoutModal = ({ show, handleClose }: CommonModalProps) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="logout_modal"
        >
            <div className="modal_heading">
                <h2>Are you sure you want to <br />
                    <span>logout ?</span></h2>
            </div>
            <div className="modal_action">
                <Button onClick={handleClose}>Logout</Button>
                <Button onClick={handleClose} className="cancel_btn">Cancel</Button>
            </div>
        </Modal>
    )
}

export default LogoutModal
