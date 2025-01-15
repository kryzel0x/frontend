import { Container } from "react-bootstrap";
import Table from "../../../common/Table/Table";
import "./StakingStatement.scss";
import coins from "../../../../assets/images/daily-returns-coins.png";
import { useEffect, useState } from "react";
import { useKeylessAccounts } from "../../../../core/useKeylessAccounts";
import { useAppSelector } from "../../../../utils/hooks";
import { RootState } from "../../../../redux/store";
import { handleGetUserDailyReturn } from "../../../../services/aptos.service";
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

  const { activeAccount } = useKeylessAccounts();
  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals
  );
  const krzBalance = useAppSelector(
    (state: RootState) => state.user.krzBalance
  );

  const [myDailyReturns, setMyDailyReturns] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    const handleGetMyDailyReturns = async () => {
      try {
        setTableLoading(true);
        const res = await handleGetUserDailyReturn(activeAccount);
        if (res && res.length) {
          // Format the response data
          const formattedData = res[0].map((item) => {
            // Precompute frequently used values
            const decimals = Math.pow(10, krzDecimals);
            const amountStaked = item.amount_staked / decimals;
            const liquidityPool = item.liquidity_pool / decimals;
            const revenueShare = (amountStaked / liquidityPool) * 10000;

            // Return the formatted data
            return {
              date: moment.unix(item.date).format("Do MMMM ‘YY"), // Convert UNIX timestamp to readable date
              amount: amountStaked.toLocaleString(), // Format amount staked
              pool: liquidityPool.toLocaleString(), // Format liquidity pool
              revenue: 10000, // Placeholder for revenue (update with actual logic if required)
              share: revenueShare.toFixed(2), // Revenue share as percentage
              apy: ((revenueShare / liquidityPool) * 365).toFixed(2), // Simplified APY calculation
            };
          });

          setMyDailyReturns(formattedData);
          setTableLoading(false);
        } else {
          setTableLoading(false);
        }
      } catch (error) {
        setTableLoading(false);
      }
    };

    if (activeAccount) {
      handleGetMyDailyReturns();
    }
  }, [activeAccount, krzBalance]);

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
              myDailyReturns.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className="date">{item.date}</span>
                  </td>
                  <td>{item.amount}</td>
                  <td>{item.pool}</td>
                  <td>{item.revenue}</td>
                  <td>{item.share}</td>
                  <td>{item.apy}</td>
                </tr>
              ))}
          </Table>
        </div>
      </Container>
    </section>
  );
};

export default StakingStatement;
