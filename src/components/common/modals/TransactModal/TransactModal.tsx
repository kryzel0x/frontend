import { useFormik } from "formik";
import amountIcon from "../../../../assets/images/amount-icon.png"
import * as Yup from "yup";
import Modal, { CommonModalProps } from "../Modal/Modal";
import coin from "../../../../assets/images/krz-logo.png";
import "./TransactModal.scss";
import Input from "../../form/Input/Input";
import Button from "../../Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { handleStakeCoins } from "../../../../services/aptos.service";
import { useKeylessAccounts } from "../../../../core/useKeylessAccounts";
import toast from "react-hot-toast";
import { formatAmount, truncateToTwoDecimals } from "../../../../services/common.service";
import { aptosClient, KRYZEL_COIN } from "../../../../core/constants";
import { setAptBalance, setKrzBalance } from "../../../../redux/slices/user.slice";

const TransactModal = ({ show, handleClose }: CommonModalProps) => {
    const dispatch: AppDispatch = useAppDispatch();

    const { activeAccount } = useKeylessAccounts();
    const krzBalance = useAppSelector(
        (state: RootState) => state.user.krzBalance
    );
    const krzDecimals = useAppSelector(
        (state: RootState) => state.user.krzDecimals
    );
    const loading = useAppSelector(
        (state: RootState) => state.loading.componentLoading
    );

    const getBalance = async () => {
        try {
            const amount = await aptosClient.getAccountCoinsData({
                accountAddress: activeAccount?.accountAddress.toString(),
            });

            // Find the specific asset with the matching type
            const aptosCoinData = amount.find(
                (coin) => coin.asset_type === "0x1::aptos_coin::AptosCoin"
            );

            const krzCoinData = amount.find(
                (coin) =>
                    coin.asset_type === KRYZEL_COIN
            );

            if (aptosCoinData) {
                // Dispatch to Redux with the balance
                dispatch(
                    setAptBalance(
                        aptosCoinData.amount /
                        Math.pow(10, aptosCoinData.metadata.decimals)
                    ) // Adjust for decimals
                );
            } else {
                console.warn("Aptos Coin not found in the account data");
            }

            if (krzCoinData) {
                // Dispatch to Redux with the balance
                dispatch(
                    setKrzBalance(
                        krzCoinData.amount / Math.pow(10, krzCoinData.metadata.decimals)
                    ) // Adjust for decimals
                );
            } else {
                console.warn("KRZ Coin not found in the account data");
            }
        } catch (error) {
            console.error("Error fetching account coins data:", error);
        }
    };

    // Define form validation schema with Yup
    const validationSchema = Yup.object({
        amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be positive")
            .test(
                "max-amount",
                `Amount cannot exceed your current balance of ${truncateToTwoDecimals(krzBalance)} KRZ.`,
                (value) => value !== undefined && value <= truncateToTwoDecimals(krzBalance)
            ),
        risk: Yup.boolean()
            .oneOf([true], "You must agree to the risk statement.")
            .required(),
        day: Yup.boolean()
            .oneOf(
                [true],
                "You must agree to the volatility statement and commit for 2 days."
            )
            .required(),
    });

    // Initialize useFormik
    const formik = useFormik({
        initialValues: {
            amount: "",
            risk: false,
            day: false,
        },
        validationSchema,
        onSubmit: async (values) => {
            const res = await handleStakeCoins(
                activeAccount,
                values.amount * Math.pow(10, krzDecimals)
            );
            if (res?.hash) {
                formik.resetForm()
                toast.success("🎉 KRZ Staked to Pool", { id: "stake_success" });
                handleClose && handleClose()
                getBalance()
            }
        },
    });

    return (
        <Modal show={show} onHide={handleClose} className="transact_modal">
            <div className="modal_heading">
                <h2>Stake your    <img src={coin} alt="coin" />      $KRZ</h2>
                {/* <h3>

                    KRZ
                </h3> */}
            </div>
            <p className="current_bal">
                Current Balance {" "}: {" "}
                {/* <img src={coin} alt="coin" /> */}
                {formatAmount(Number(truncateToTwoDecimals(krzBalance)))}{" "}
                KRZ
            </p>
            <form onSubmit={formik.handleSubmit}>
                {/* Amount Input */}
                <Input
                    type="number"
                    placeholder="Amount"
                    inputMode="numeric"
                    pattern="\d*"
                    label="Amount KRZ"
                    icon={<img src={amountIcon} alt="amount" />}
                    name="amount"
                    // rightIcon={"≈$0.00 USD"}
                    value={formik.values.amount}
                    isInvalid={formik.touched.amount && !!formik.errors.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling on the number input
                    error={formik.touched.amount && formik.errors.amount}
                />

                {/* Checkboxes */}
                <div className="checkboxes">
                    <div className="custom_checkbox">
                        <input
                            type="checkbox"
                            name="risk"
                            id="risk"
                            checked={formik.values.risk}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="risk">
                            I understand that there is a risk of a potential loss.
                        </label>
                        {/* {formik.touched.risk && formik.errors.risk && (
              <div className="error">{formik.errors.risk}</div>
            )} */}
                    </div>
                    <div className="custom_checkbox">
                        <input
                            type="checkbox"
                            name="day"
                            id="day"
                            checked={formik.values.day}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="day">
                            I understand that day-to-day volatility can be significant and
                            that I commit my deposit for 2 days before it can be withdrawn.
                        </label>
                        {/* {formik.touched.day && formik.errors.day && (
              <div className="error">{formik.errors.day}</div>
            )} */}
                    </div>
                </div>

                <Button
                    className="stake_btn"
                    fluid
                    type="submit"
                    disabled={loading || !formik.values.amount || !formik.isValid}
                    loading={loading}
                >
                    Stake[+] to Reserve Pool
                </Button>
            </form>
        </Modal>
    );
};

export default TransactModal;
