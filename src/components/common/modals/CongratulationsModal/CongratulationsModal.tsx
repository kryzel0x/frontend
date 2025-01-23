import coin from "../../../../assets/images/krz-logo.png";
import logo from "../../../../assets/logo/logo.png";
import { useAppSelector } from "../../../../utils/hooks";
import Modal, { CommonModalProps } from "../Modal/Modal";
import "./CongratulationsModal.scss";
import { UserDetails } from "../../../../utils/utils";
import { RootState } from "../../../../redux/store";
import { BONUS_AMOUNT } from "../../../../core/constants";
import Button from "../../Button/Button";
import { formatAmount } from "../../../../services/common.service";

const CongratulationsModal = ({ handleClose, show }: CommonModalProps) => {
    const userDetails = useAppSelector(
        (state: RootState) => state.user.userDetails
    ) as UserDetails;
    return (
        <Modal onHide={handleClose} className="congratulations_modal" show={show}>
            <div className="modal_heading">
                <img src={logo} alt="logo" />
                <h2>Congratulations! <span> {userDetails?.name}</span></h2>
            </div>
            <h3>You have successfully created
                the <span>Aptos wallet.</span></h3>
            {/* <h3>
        Your <span>Aptos wallet</span> has been created. <br />
        Here’s your <span>joining bonus</span> of
      </h3> */}
            <h4>
                <div><img src={coin} alt="coin" /></div> {formatAmount(BONUS_AMOUNT)} <span>KRZ</span>
                {/* KRZ */}
            </h4>
            <Button fluid onClick={handleClose}>Start Earning</Button>
        </Modal>
    );
};

export default CongratulationsModal;
