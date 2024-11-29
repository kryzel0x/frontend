import Modal, { CommonModalProps } from "../Modal/Modal";
import coin from "../../../../assets/icons/coin.png";
import "./TransactModal.scss";
import Input from "../../form/Input/Input";
import Button from "../../Button/Button";

const TransactModal = ({ show, handleClose }: CommonModalProps) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="transact_modal"
        >
            <div className="modal_heading">
                <h2>Deposit in</h2>
                <h3><img src={coin} alt="coin" />KRZ</h3>
            </div>
            <p className="current_bal">
                Current Balance: <img src={coin} alt="coin" /> 1500 KRZ
            </p>
            <form>
                <Input
                    type="number"
                    placeholder="Amount"
                    inputMode="numeric"
                    pattern="\d*"
                    name="amount"
                />
                <div className="checkboxes">
                    <div className="custom_checkbox">
                        <input type="checkbox" name="risk" id="risk" />
                        <label htmlFor="risk">I understand that there is a risk of a potential loss.</label>
                    </div>
                    <div className="custom_checkbox">
                        <input type="checkbox" name="day" id="day" />
                        <label htmlFor="day">I understand that day-to-day volatility can be significant and that I commit my deposit for 2 days, before it can be withdrawn</label>
                    </div>
                </div>
                <Button className="stake_btn" fluid type="submit">Stake[+] to Reserve Pool</Button>
            </form>
        </Modal>
    )
}

export default TransactModal
