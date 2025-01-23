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
import { formatAmount } from "../../../../services/common.service";

const MyStakes = () => {
  const loading = useAppSelector(
    (state: RootState) => state.loading.componentLoading
  );
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

  const getStatus = (activationDate) => {
    const now = moment.utc();
    const activation = moment.unix(activationDate).utc();
    const expiry = activation.clone().add(2, "days");
    const secondDay = activation.clone().add(1, "day");
 
    if (now.isBefore(activation)) {
      return "In Process";
    } else if (now.isSame(secondDay, "day")) {
      return "Restake";
    } else if (now.isBetween(activation, expiry)) {
      return "Active";
    } else {
      return "Expired";
    }
  };

  // const getStatus = (activationDate) => {
  //   const now = moment.utc(); // Current UTC time
  //   const activation = moment.unix(activationDate); // Activation time (UTC midnight)
  //   const expiry = activation.clone().add(2, "days"); // Expiry time (2 days after activation)

  //   if (now.isBefore(activation)) {
  //     return "In Process"; // Before activation (Day 1)
  //   } else if (now.isBetween(activation, expiry)) {
  //     return "Active"; // Between activation and expiry (Day 2-3)
  //   } else {
  //     return "Expired"; // After expiry (Day 4+)
  //   }
  // };

  useEffect(() => {
    const handleGetMyStakes = async () => {
      setTableLoading(true);
      const res = await handleGetUserStakes(activeAccount);

      console.log('res', res)
      if (res && res.length) {
        const formattedStakes = res[0].map((stake) => ({
          date: moment.unix(stake.stake_date).utc().format("Do MMMM 'YY"), // Added .utc()
          amount: stake.amount / Math.pow(10, krzDecimals),
          expiry: moment.unix(stake.expiry_date).utc().format("Do MMMM 'YY"), // Added .utc()
          status: getStatus(stake.activation_date),
        }));
        setMyStakes(formattedStakes);
      }
      setTableLoading(false);
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
                    <td>{formatAmount(item.amount)}</td>
                    <td>{item.expiry}</td>
                    <td className={item.status.toLowerCase()}>{item.status}</td>
                    <td>
                      {item.status === "Restake" && (
                        <Button
                          className="invest_btn"
                          loading={loading}
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
