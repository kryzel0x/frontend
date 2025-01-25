import { Container } from "react-bootstrap";
import Table from "../../../common/Table/Table";
import "./StakingStatement.scss";
import coins from "../../../../assets/images/daily-returns-coins.png";
import { useEffect, useState } from "react";
import { useKeylessAccounts } from "../../../../core/useKeylessAccounts";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { formatAmount } from "../../../../services/common.service";
import { callApiGetMethod } from "../../../../redux/Actions/api.action";
import { APIURL } from "../../../../utils/constants";
import moment from "moment";

const StakingStatement = () => {
  const fields = [
    { name: <>Date</> },
    { name: <>Amount Staked (in KRZ)</> },
    { name: <>Liquidity Pool</> },
    { name: <>Total Revenue</> },
    { name: <>My Revenue</> },
    { name: <>APY</> },
  ];

  const dispatch: AppDispatch = useAppDispatch();

  const { activeAccount } = useKeylessAccounts();

  const [myDailyReturns, setMyDailyReturns] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [lpAmount, setLpAmount] = useState(0);
  const [revenueData, setRevenueData] = useState({});

  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals
  );

  useEffect(() => {
    const handleGetDailyReturn = async () => {
      setTableLoading(true);
      const res: any = await dispatch(
        callApiGetMethod(APIURL.GETDAILYSTAKES, {}, false, false)
      );
      if (res && !res.error) {
        setMyDailyReturns(res?.result);
        setTableLoading(false);
      } else {
        setTableLoading(false);
      }
    };

    const handleGetLpAmount = async () => {
      const res: any = await dispatch(
        callApiGetMethod(APIURL.GETLPAMOUNT, {}, false, false)
      );
      if (res && !res.error) {
        setLpAmount(res?.result?.totalAmount);
        setTableLoading(false);
      } else {
        setTableLoading(false);
      }
    };
    if (activeAccount) {
      handleGetDailyReturn();
      handleGetLpAmount();
    }
  }, [activeAccount]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleGetRevenueByDate = async (timestamp) => {
      try {
        const formattedDate = timestamp;

        const res = await dispatch(
          callApiGetMethod(
            APIURL.GETREVENUE,
            { date: formattedDate },
            false,
            false
          )
        );
        if (res && !res.error) {
          setRevenueData((prevData) => ({
            ...prevData,
            [formattedDate]: res?.data?.amount,
          }));
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    myDailyReturns.forEach((item) => {
      if (item.date) {
        handleGetRevenueByDate(item.date);
      }
    });
  }, [myDailyReturns]);

  return (
    <section className="staking_statements">
      <Container>
        <div className="statements_in">
          <img src={coins} alt="coins" className="coins" />
          <Table
            title="Your Daily Returns"
            fields={fields}
            loading={tableLoading}
          >
            {myDailyReturns.length > 0 &&
              myDailyReturns.map((item, index) => {
                const revenueAmount = revenueData[item.date];
                const myRevenue = formatAmount(
                  (item.totalStaked /
                    Math.pow(10, krzDecimals) /
                    (lpAmount / Math.pow(10, krzDecimals))) *
                    revenueAmount
                );
                return (
                  <tr key={index}>
                    <td>
                      <span className="date">
                        {moment(item.date).format("Do MMMM 'YY")}
                      </span>
                    </td>
                    <td>
                      {formatAmount(
                        item.totalStaked / Math.pow(10, krzDecimals)
                      )}{" "}
                    </td>
                    <td>
                      {lpAmount
                        ? formatAmount(lpAmount / Math.pow(10, krzDecimals))
                        : "-"}{" "}
                    </td>
                    <td>{formatAmount(revenueAmount)}</td>

                    <td>{myRevenue}</td>
                    <td>
                      {(
                        (myRevenue / (lpAmount / Math.pow(10, krzDecimals))) *
                        365 *
                        100
                      ).toFixed(2) + "%"}
                    </td>
                  </tr>
                );
              })}
          </Table>
        </div>
      </Container>
    </section>
  );
};

export default StakingStatement;
