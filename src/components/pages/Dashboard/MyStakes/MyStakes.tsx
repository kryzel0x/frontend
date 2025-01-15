import { Container } from "react-bootstrap";
import "./MyStakes.scss";
import Table from "../../../common/Table/Table";
import Button from "../../../common/Button/Button";
import {
  handleGetUserStakes,
  handleRestakeFunc,
} from "../../../../services/aptos.service";
import { useKeylessAccounts } from "../../../../core/useKeylessAccounts";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAppSelector } from "../../../../utils/hooks";
import { RootState } from "../../../../redux/store";

const MyStakes = () => {
  const fields = [
    {
      name: (
        <>
          Date of <br />
          Staking
        </>
      ),
    },
    {
      name: (
        <>
          Amount <br />
          Staked (in KRZ)
        </>
      ),
    },
    {
      name: (
        <>
          Expiry <br />
          Date
        </>
      ),
    },
    { name: <>Status</> },
    { name: <></> },
  ];

  const { activeAccount } = useKeylessAccounts();
  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals
  );

  const krzBalance = useAppSelector(
    (state: RootState) => state.user.krzBalance
  );
  const [myStakes, setMyStakes] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const formatExpiryDate = (expiryDate) => {
    const expiry = moment.unix(expiryDate);
    return expiry.format("Do MMMM 'YY, HH:mm [UTC]");
  };

  const getStatus = (stakeDate) => {
    const now = moment();
    const stakeMoment = moment.unix(stakeDate);
    const diffInMinutes = now.diff(stakeMoment, "minutes");

    if (diffInMinutes <= 2) {
      return "In Process"; // First 2 minutes
    } else if (diffInMinutes > 2 && diffInMinutes <= 6) {
      return "Active"; // 3rd to 6th minute
    } else {
      return "Expired"; // 7th minute onwards
    }
  };

  useEffect(() => {
    const handleGetMyStakes = async () => {
      setTableLoading(true);
      const res = await handleGetUserStakes(activeAccount);
      console.log('res>', res)
      if (res && res.length) {
        const formattedStakes = res[0].map((stake) => ({
          date: moment.unix(stake.activation_date).format("Do MMMM 'YY, HH:mm [UTC]"),
          amount: stake.amount / Math.pow(10, krzDecimals), // Assuming KRZ has 6 decimals
          expiry: formatExpiryDate(stake.expiry_date),
          status: getStatus(stake.activation_date),
        }));
        setMyStakes(formattedStakes);
        setTableLoading(false);
      } else {
        setTableLoading(false);
      }
    };

    if (activeAccount) {
      handleGetMyStakes();
    }
  }, [activeAccount, krzBalance, krzDecimals]);

  const handleRestake = async (index) => {
    const res = await handleRestakeFunc(activeAccount, index);
    console.log("res", res);
  };

  return (
    <section className="my_stakes">
      <Container>
        <div className="my_stakes_in">
          <Table title="My Stakes" fields={fields} loading={tableLoading}>
            {myStakes.length > 0 &&
              myStakes.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <span className="date">{item.date}</span>
                    </td>
                    <td>{item.amount}</td>
                    <td>{item.expiry}</td>
                    <td className={item.status.toLowerCase()}>{item.status}</td>
                    <td>
                      {item.status === "Active" && (
                        <Button
                          className="invest_btn"
                          onClick={() => handleRestake(index)}
                        >
                          Restake
                        </Button>
                      )}
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

export default MyStakes;
