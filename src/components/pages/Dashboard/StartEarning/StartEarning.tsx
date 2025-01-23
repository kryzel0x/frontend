import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import left from "../../../../assets/images/dashboard-banner-left-coin.png";
import right from "../../../../assets/images/dashboard-banner-right-coin.png";
import top from "../../../../assets/images/dashboard-banner-top-coin.png";
import Button from "../../../common/Button/Button";
import TransactModal from "../../../common/modals/TransactModal/TransactModal";
import "./StartEarning.scss";
import { handleGetUserStakes } from "../../../../services/aptos.service";
import { useKeylessAccounts } from "../../../../core/useKeylessAccounts";
import { useAppSelector } from "../../../../utils/hooks";
import { RootState } from "../../../../redux/store";
import { formatAmount } from "../../../../services/common.service";

const StartEarning = () => {
  const [show, setShow] = useState(false);
  const { activeAccount } = useKeylessAccounts();
  const [stakeAmount, setStakeAmount] = useState(0);
  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals
  );

  function calculateTotalAmount(records) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    let totalAmount = 0;

    records.forEach((record) => {
      if (Number(record.expiry_date) > currentTimestamp) {
        totalAmount += Number(record.amount);
      }
    });

    return totalAmount;
  }

  useEffect(() => {
    const handleGetMyDailyReturns = async () => {
      try {
        const res = await handleGetUserStakes(activeAccount);
        if (res && res.length) {
          const totalStakedAmount = calculateTotalAmount(res[0]);
          setStakeAmount(totalStakedAmount);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (activeAccount) {
      handleGetMyDailyReturns();
    }
  }, [activeAccount]);

  return (
    <section className="start_earning">
      <Container>
        <div className="earning_in">
          <img src={top} alt="top-shadow" className="top_shadow" />
          <img src={left} alt="left-shadow" className="left_shadow" />
          <img src={right} alt="right-shadow" className="right_shadow" />
          {stakeAmount > 0 ? (
            <>
              <h1>My Total Stakes</h1>
              <h2>{formatAmount(stakeAmount / Math.pow(10, krzDecimals))}</h2>
            </>
          ) : (
            <>
              <h1>Start earning now!</h1>
              <h2>{formatAmount(10000)} KRZ</h2>
            </>
          )}
          <Button onClick={() => setShow(true)} className="stake_btn">
            Stake [+] to Reserve Pool
          </Button>
          <TransactModal show={show} handleClose={() => setShow(false)} />
          {/* <div className="earn_details">
                        <div className="earn_details_box">
                            <h3> Wallet Balance</h3>
                            <p><img src={coin} alt="coin" /> 3563 <span>KRZ</span></p>
                        </div>
                        <div className="earn_details_center">
                            <h3>Deposited</h3>
                            <ul>
                                <li>
                                    <h4>Today</h4>
                                    <p><img src={coin} alt="coin" /> 550 <span>KRZ</span></p>
                                </li>
                                <li>
                                    <h4>T+1</h4>
                                    <p><img src={coin} alt="coin" /> 490 <span>KRZ</span></p>
                                </li>
                                <li>
                                    <h4>T+2</h4>
                                    <p><img src={coin} alt="coin" /> 300 <span>KRZ</span></p>
                                </li>
                            </ul>
                        </div>
                        <div className="earn_details_box">
                            <h3> Wallet Balance</h3>
                            <p><img src={coin} alt="coin" /> 3563 <span>KRZ</span></p>
                        </div>
                    </div> */}
        </div>
      </Container>
    </section>
  );
};

export default StartEarning;
