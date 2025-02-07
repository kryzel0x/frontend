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
  const [lpAmount, setLpAmount] = useState(0);
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
          APIURL.GETALLDAILYSTAKES,
          { page: currentPage + 1, limit: 10 },
          false,
          false
        )
      );
      if (res && !res.error) {
        setDailyReturns(res?.result);
        setTotalPages(res?.totalPages || 1);
      }
      setTableLoading(false);
    };

    const handleGetSumOfLpAmount = async () => {
      const res: any = await dispatch(
        callApiGetMethod(APIURL.SUMLPAMOUNT, {}, false, false)
      );
      if (res && !res.error) {
        setLpAmount(res?.data);
      }
    };

    handleGetDailyReturn();
    handleGetSumOfLpAmount();
  }, [dispatch, currentPage]);

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
          <img src={logo} alt="KRZ Logo" />
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
        <Table
          fields={fields}
          loading={tableLoading}
          pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected)}
        >
          {dailyReturns.length > 0 ? (
            dailyReturns.map((item: any, index) => (
              <tr key={index}>
                <td>
                  <span className="date">
                    {moment(item.date).format("Do MMM 'YY")}
                  </span>
                </td>
                <td>
                  {formatAmount(item.totalStaked / Math.pow(10, krzDecimals))}
                </td>
                <td>{item.totalRevenue}</td>
                <td>
                  {item.totalStaked &&
                    (
                      (item.totalRevenue /
                        (item.totalStaked / Math.pow(10, krzDecimals))) *
                      365 *
                      100
                    ).toFixed(0)}
                  %
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length} className="text-center">
                No Data Available
              </td>
            </tr>
          )}
        </Table>
      </Container>
    </section>
  );
};

export default RevenuePool;
