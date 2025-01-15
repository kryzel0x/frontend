import { useAppDispatch } from "../../../../utils/hooks";
import Button from "../../Button/Button";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./LogoutModal.scss";
import { logOut } from "../../../../redux/Actions/user.action";
import { AppDispatch } from "../../../../redux/store";

const LogoutModal = ({ show, handleClose }: CommonModalProps) => {
  const dispatch: AppDispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logOut())
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="logout_modal"
        >
            <div className="modal_heading">
                <h2>Are you sure you want to log out</h2>
            </div>
            <div className="modal_action">
                <Button onClick={handleLogout}>Logout</Button>
                <Button onClick={handleClose} className="cancel_btn dark_btn">Cancel</Button>
            </div>
        </Modal>
    )
}

export default LogoutModal
