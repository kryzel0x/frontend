import { Container } from "react-bootstrap";
import { clsx } from "../../../../utils/utils";
import Table from "../../../common/Table/Table";
import "./Standings.scss";

const Standings = ({ className, bottomSpacing }: { className?: string, bottomSpacing?: boolean, }) => {
    const fields = [
        { name: "#" },
        { name: "User" },
        { name: "Wallet Address" },
        { name: "Score" },
    ]
    const data = [
        { hash: "1", user: "CryptoKing321", address: "4343sds77778d7hh44fh4f8hfh4f8fh", score: "7893", },
        { hash: "2", user: "megaWeb3Champ", address: "342ds77778d7hh44fh4f8hfh4f8fh", score: "7554", },
        { hash: "3", user: "CryptoKing321", address: "4343sds77778d7hh44fh4f8hfh4f8fh", score: "6666", },
        { hash: "4", user: "megaWeb3Champ", address: "342ds77778d7hh44fh4f8hfh4f8fh", score: "5555", },
    ]
    return (
        <section className={clsx("standings_sec", className, bottomSpacing && "bottom_spacing")}>
            <Container>
                <Table
                    title="Standings"
                    fields={fields}
                >
                    {
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <tr key={item.user + index}>
                                    <td>{item.hash}</td>
                                    <td>{item.user}</td>
                                    <td>{item.address}</td>
                                    <td>{item.score}</td>
                                </tr>
                            )
                        })
                    }
                </Table>
            </Container>
        </section>
    )
}

export default Standings
