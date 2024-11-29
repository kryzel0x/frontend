import { Container } from "react-bootstrap";
import coin from "../../../../assets/icons/coin.png";
import "./RevenuePool.scss";;
import Table from "../../../common/Table/Table";

const RevenuePool = () => {
    const fields = [
        { name: "Date" },
        { name: "Revenue Pool Capital" },
        { name: "Revenue Pool" },
        { name: "% Return" },
    ]
    const data = [
        { date: "23rd", month: "December", year: "24", capital: "50", "pool": "50", return: "0" },
        { date: "19th", month: "December", year: "24", capital: "50824", "pool": "50", return: "1657" },
        { date: "16th", month: "December", year: "24", capital: "454", "pool": "50", return: "454" },
        { date: "9th", month: "December", year: "24", capital: "50", "pool": "50", return: "33" },
        { date: "3rd", month: "December", year: "24", capital: "50", "pool": "50", return: "0" },
        { date: "2nd", month: "December", year: "24", capital: "50", "pool": "50", return: "0" },
    ]
    return (
        <section className="revenue_pool_sec">
            <Container>
                <div className="revenue_pool_box">
                    <p>Total Current Revenue Pool Investment</p>
                    <h3><img src={coin} alt="coin" /> 2351606402 <span>KRZ</span></h3>
                </div>
                <Table
                    title="Daily Return to Revenue Pool"
                    fields={fields}
                >
                    {
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <tr key={item.capital + index}>
                                    <td>
                                        <span className="date">{item.date}</span><span className="year">{item.month} ‘{item.year}</span>
                                    </td>
                                    <td>{item.capital}</td>
                                    <td>{item.pool}</td>
                                    <td>{item.return}</td>
                                </tr>
                            )
                        })
                    }
                </Table>
            </Container>
        </section>
    )
}

export default RevenuePool
