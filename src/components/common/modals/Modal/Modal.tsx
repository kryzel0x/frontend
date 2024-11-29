import BModal, { ModalProps } from "react-bootstrap/Modal";
import { clsx } from "../../../../utils/utils";
import { CloseIcon } from "../../../../assets/icons/icons";
import "./Modal.scss";

export type CommonModalProps = {
    show?: boolean,
    handleClose?: () => void,
}

type PropTypes = ModalProps & {

}

const Modal = ({ className, hideCloseBtn , children, onHide, ...rest }: PropTypes) => {
    return (
        <BModal
            {...rest}
            centered
            onHide={onHide}
            className={clsx("custom_modal", className)}
        >
            {!hideCloseBtn && <button onClick={onHide} type="button" className="close_btn"><CloseIcon /></button>}
            {children}
        </BModal>
    )
}

export default Modal
