import { Container } from "react-bootstrap";
import logo from "../../../../assets/images/krz-logo.png";
import Table from "../../../common/Table/Table";
import "./RevenuePool.scss";
import { formatAmount } from "../../../../services/common.service";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { callApiGetMethod } from "../../../../redux/Actions/api.action";
import { APIURL } from "../../../../utils/constants";
import moment from "moment";

const RevenuePool = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [dailyReturns, setDailyReturns] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [lpAmount, setLpAmount] = useState(0)

  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals
  );

  useEffect(() => {
    const handleGetDailyReturn = async () => {
      setTableLoading(true);
      const res: any = await dispatch(
        callApiGetMethod(APIURL.GETALLDAILYSTAKES, {}, false, false)
      );
      console.log("res", res);
      if (res && !res.error) {
        setDailyReturns(res?.result);
        setTableLoading(false);
      } else {
        setTableLoading(false);
      }
    };
    const handleGetSumOfLpAmount = async () => {
      const res: any = await dispatch(
        callApiGetMethod(APIURL.SUMLPAMOUNT, {}, false, false)
      );
      if (res && !res.error) {
        setLpAmount(res?.data);
      }
    }
    handleGetDailyReturn();
    handleGetSumOfLpAmount();
  }, [dispatch]);

  const fields = [
    { name: "Date" },
    {
      name: (
        <>
          $KRZ <br /> in Liquidity Pool
        </>
      ),
    },
    {
      name: (
        <>
          Revenue <br /> Earned
        </>
      ),
    },
    { name: "APY" },
  ];

  return (
    <section className="revenue_pool_sec">
      <Container>
        <div className="revenue_pool_box">
          <img src={logo} alt="" />
        </div>
        <div className="revenue_details">
          <h3>
            <span>{formatAmount(lpAmount)}</span>
            <>KRZ</>
          </h3>
          <p>Total $KRZ Staked</p>
          <h4>in Liquidity Pool Till Date</h4>
          <h2>
            <span>Daily Returns from the</span>
            $KRZ Staked in Liquidity Pools
          </h2>
        </div>
        <Table fields={fields} loading={tableLoading}>
          {dailyReturns.length > 0 &&
            dailyReturns.map((item: any, index) => {
              return (
                <tr key={index}>
                  <td>
                    <span className="date">
                      {moment(item.date).format("Do MMM 'YY")}
                    </span>
                  </td>
                  <td>
                    {formatAmount(item.totalLpAmount / Math.pow(10, krzDecimals))}
                  </td>
                  <td>
                    {item.returnAmount % 1 !== 0
                      ? Number(item.returnAmount).toFixed(2)
                      : item.returnAmount}
                  </td>

                  <td>
                    {(
                      (item.returnAmount /
                        (item.totalStaked / Math.pow(10, krzDecimals))) *
                      365 *
                      100
                    ).toFixed(0) + "%"}
                  </td>
                </tr>
              );
            })}
        </Table>
      </Container>
    </section>
  );
};

export default RevenuePool;
