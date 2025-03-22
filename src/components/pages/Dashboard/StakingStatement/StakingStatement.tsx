import { Container } from "react-bootstrap";
import Table from "../../../common/Table/Table";
import "./StakingStatement.scss";
import coins from "../../../../assets/images/daily-returns-coins.png";
import { useEffect, useState } from "react";
import { useKeylessAccounts } from "../../../../core/useKeylessAccounts";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  formatAmount,
  toSentenceCase,
} from "../../../../services/common.service";
import { callApiGetMethod } from "../../../../redux/Actions/api.action";
import { APIURL } from "../../../../utils/constants";
import moment from "moment";

const StakingStatement = () => {
  const fields = [
    { name: <>Date</> },
    { name: <>Staked (KRZ)</> },
    { name: <>Liquidity Pool</> },
    { name: <>Total Revenue</> },
    { name: <>My Revenue</> },
    { name: <>APY</> },
    // { name: <>Credit</> },
  ];

  const dispatch: AppDispatch = useAppDispatch();

  const { activeAccount } = useKeylessAccounts();

  const [myDailyReturns, setMyDailyReturns] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals
  );

  useEffect(() => {
    const handleGetDailyReturn = async () => {
      setTableLoading(true);
      const res: any = await dispatch(
        callApiGetMethod(
          APIURL.GETDAILYSTAKES,
          { page: currentPage + 1, limit: 10 },
          false,
          false
        )
      );
      if (res && !res.error) {
        setMyDailyReturns(res?.result);
        setTotalPages(res?.totalPages || 1);
        setTableLoading(false);
      } else {
        setTableLoading(false);
      }
    };
    if (activeAccount) {
      handleGetDailyReturn();
    }
  }, [activeAccount, currentPage, dispatch]);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const handleGetRevenueByDate = async (timestamp) => {
//       try {
//         const formattedDate = timestamp;
//         console.log("formattedDate", formattedDate);

//         const res = await dispatch(
//           callApiGetMethod(
//             APIURL.GETREVENUE,
//             { date: formattedDate },
//             false,
//             false
//           )
//         );
//         if (res && !res.error) {
//           setRevenueData((prevData) => ({
//             ...prevData,
//             [formattedDate]: res?.data?.amount,
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching revenue data:", error);
//       }
//     };

//     myDailyReturns.forEach((item) => {
//       if (item.date) {
//         console.log("item.date", item.date);
//         handleGetRevenueByDate(item.date);
//       }
//     });
//   }, [myDailyReturns]);

  return (
    <section className="staking_statements">
      <Container>
        <div className="statements_in">
          <img src={coins} alt="coins" className="coins" />
          <Table
            title="Your Daily Returns"
            fields={fields}
            loading={tableLoading}
            pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={({ selected }) => setCurrentPage(selected)}
          >
            {myDailyReturns.length > 0 &&
              myDailyReturns.map((item, index) => {
                const myRevenue =
                  (item.totalRevenue /
                    (item.lpAmount / Math.pow(10, krzDecimals))) *
                  (item.totalStaked / Math.pow(10, krzDecimals));
                return (
                  <tr key={index}>
                    <td>
                      <span className="date">
                        {moment(item.date).format("DD MMM YY")}
                      </span>
                    </td>
                    <td>
                      {formatAmount(
                        item.totalStaked / Math.pow(10, krzDecimals)
                      )}{" "}
                    </td>
                    <td>
                      {item.lpAmount
                        ? formatAmount(
                            item.lpAmount / Math.pow(10, krzDecimals)
                          )
                        : "-"}{" "}
                    </td>
                    {/* <td>{formatAmount(revenueAmount)}</td> */}
                    <td>{formatAmount(item.totalRevenue)}</td>

                    <td>{formatAmount(item.returnAmount)}</td>
                    <td>
                      {(
                        (myRevenue /
                          (item.totalStaked / Math.pow(10, krzDecimals))) *
                        365 *
                        100
                      ).toFixed(0) + "%"}
                    </td>
                    {/* <td>{toSentenceCase(item.paymentStatus)}</td> */}
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
