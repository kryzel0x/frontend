import { Container } from "react-bootstrap";
import logo from "../../../../assets/images/krz-logo.png";
import Table from "../../../common/Table/Table";
import "./RevenuePool.scss";
import { formatAmount } from "../../../../services/common.service";

const RevenuePool = () => {
    const fields = [
        { name: "Date of Staking" },
        { name: <>$KRZ <br /> in Liquidity Pool</> },
        { name: <>Revenue <br /> Earned</> },
        { name: "APY" },
    ]
    const data = [
        { date: "23rd", month: "Dec", year: "2024", pool: "259698", revenue: "50", apy: "0", },
        { date: "19th", month: "Dec", year: "2024", pool: "19th", revenue: "50", apy: "1657", },
        { date: "16th", month: "Dec", year: "2024", pool: "16th", revenue: "50", apy: "454", },
        { date: "9th", month: "Dec", year: "2024", pool: "9th", revenue: "50", apy: "33", },
        { date: "3rd", month: "Dec", year: "2024", pool: "3rd", revenue: "50", apy: "0", },
        { date: "2nd", month: "Dec", year: "2024", pool: "2nd", revenue: "50", apy: "0", },
    ]
    return (
        <section className="revenue_pool_sec">
            <Container>
                <div className="revenue_pool_box">
                    <img src={logo} alt="" />
                </div>
                <div className="revenue_details">
                    <h3><span>{formatAmount(37680595487)}</span><>KRZ</></h3>
                    <p>Total $KRZ Staked</p>
                    <h4>in Liquidity Pool Till Date</h4>
                    <h2>
                        <span>Your Daily Returns from the</span>
                        $KRZ Staked in Liquidity Pools</h2>
                </div>
                <Table
                    fields={fields}
                >
                    {
                        data.length < 0 &&
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <span className="date">{item.date}</span><span className="year">{item.month} {item.year}</span>
                                    </td>
                                    <td>{formatAmount(item.pool)}</td>
                                    <td>{item.revenue}</td>
                                    <td>{item.apy}</td>
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
