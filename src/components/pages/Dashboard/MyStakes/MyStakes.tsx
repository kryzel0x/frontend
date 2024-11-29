import { Container } from "react-bootstrap";
import "./MyStakes.scss";
import Table from "../../../common/Table/Table";
import Button from "../../../common/Button/Button";

const MyStakes = () => {
    const fields = [
        { name: "Date" },
        { name: <>Amount <br />(KRZ) </> },
        { name: <>Lock In  <br />Period</> },
        { name: <>Pool <br />Revenue</> },
        { name: <>My Rev. <br />Share</> },
        { name: <>Return <br />%</> },
        { name: <>Status</> },
        { name: <></> },
    ]
    const data = [
        { date: "16th", month: "December", year: "24", amount: "57,880", lockPeriod: "2 Days", poolRevenue: "108", share: "+34", return: "3.40 %", status: "Active", },
        { date: "16th", month: "December", year: "24", amount: "57,880", poolRevenue: "108", share: "+34", return: "3.40 %", status: "Expired", },
        { date: "16th", month: "December", year: "24", amount: "57,880", lockPeriod: "2 Days", poolRevenue: "108", share: "+34", return: "3.40 %", status: "Active", },
        { date: "16th", month: "December", year: "24", amount: "57,880", lockPeriod: "2 Days", poolRevenue: "108", share: "+34", return: "3.40 %", status: "Active", },
        { date: "16th", month: "December", year: "24", amount: "57,880", lockPeriod: "2 Days", poolRevenue: "108", share: "+34", return: "3.40 %", status: "Active", },
    ]
    return (
        <section className="my_stakes">
            <Container>
                <div className="my_stakes_in">
                    <Table
                        title="My Stakes"
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
                                        <td>{item.amount}</td>
                                        <td>{item.lockPeriod || "-"}</td>
                                        <td>{item.poolRevenue}</td>
                                        <td className="share">{item.share}</td>
                                        <td>{item.return}</td>
                                        <td className={item.status.toLowerCase()}>{item.status}</td>
                                        <td>
                                            <Button className="invest_btn">Invest More</Button>
                                        </td>
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

export default MyStakes
