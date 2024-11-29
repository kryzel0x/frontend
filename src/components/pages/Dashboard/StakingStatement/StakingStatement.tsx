import { Container } from "react-bootstrap";
import Table from "../../../common/Table/Table";
import "./StakingStatement.scss";

const StakingStatement = () => {
    const fields = [
        { name: "Date ", },
        { name: "Activity", },
        { name: "Amount (KRZ)", },
    ]
    const data = [
        { date: "16th", month: "December", year: "24", activity: "Deposit", amount: "57,880", },
        { date: "16th", month: "December", year: "24", activity: "Expiry", amount: "108", },
        { date: "16th", month: "December", year: "24", activity: "Deposit", amount: "57,880", },
        { date: "16th", month: "December", year: "24", activity: "Expiry", amount: "57,880", },
        { date: "16th", month: "December", year: "24", activity: "Bonus", amount: "57,880", },
    ]
    return (
        <section className="staking_statements">
            <Container>
                <div className="statements_in">
                    <Table
                        title="Staking Statement"
                        fields={fields}
                    >
                        {
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span className="date">{item.date}</span><span className="year">{item.month} ‘{item.year}</span>
                                        </td>
                                        <td className={item.activity.toLocaleLowerCase()}>{item.activity}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </div>
            </Container>
        </section>
    )
}

export default StakingStatement
