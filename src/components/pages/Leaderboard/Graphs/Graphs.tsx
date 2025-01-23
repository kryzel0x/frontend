import { Container, Nav, Tab } from "react-bootstrap";
import logo from "../../../../assets/images/graphs-amoutn.png";
import "./Graphs.scss";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { formatAmount } from "../../../../services/common.service";

const data = [
    { date: '27 Dec', value1: 5, value2: 10, value3: 8 },
    { date: '28 Dec', value1: 15, value2: 18, value3: 12 },
    { date: '29 Dec', value1: 25, value2: 22, value3: 18 },
    { date: '30 Dec', value1: 18, value2: 30, value3: 25 },
    { date: '31 Dec', value1: 20, value2: 28, value3: 22 },
    { date: '1 Jan', value1: 30, value2: 32, value3: 27 },
    { date: '2 Jan', value1: 22, value2: 25, value3: 20 },
    { date: '3 Jan', value1: 25, value2: 28, value3: 23 },
    { date: '4 Jan', value1: 28, value2: 30, value3: 25 },
    { date: '5 Jan', value1: 30, value2: 35, value3: 28 },
    { date: '6 Jan', value1: 35, value2: 38, value3: 32 },
    { date: '7 Jan', value1: 40, value2: 42, value3: 35 },
];
const Graphs = () => {
    return (
        <section className='graphs_design'>
            <Container>
                <div className="graphs_in">
                    <Tab.Container defaultActiveKey="total_balance">
                        <Nav>
                            <Nav.Link eventKey="total_balance">Total Balance</Nav.Link>
                            <Nav.Link eventKey="liquidity_staking">Liquidity Staking</Nav.Link>
                            <Nav.Link eventKey="crash_game">Crash Game</Nav.Link>
                            <Nav.Link eventKey="off_chain_activities">Off-Chain Activities</Nav.Link>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="total_balance">
                                <div className="graph_box">
                                    <div className="graph_box_header">
                                        <h3>Monthly Report</h3>
                                        <p><img src={logo} alt="logo" />{formatAmount(2895)} <span>KRZ</span></p>
                                    </div>
                                    <ResponsiveContainer width="100%" height={document.body.clientWidth > 767 ? 400 : 200}>
                                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#00c8ff" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#00c8ff" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#7c4dff" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#00ff99" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#00ff99" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                            <XAxis dataKey="date" stroke="#ccc" />
                                            <YAxis stroke="#ccc" />
                                            <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                            {/* <Legend verticalAlign="top" height={36} /> */}
                                            <Area
                                                // dot={<circle fill="#00c8ff" />}
                                                type="monotone"
                                                dataKey="value1"
                                                stroke="#00c8ff"
                                                fill="url(#color1)"
                                                strokeWidth={4}
                                            />
                                            <Area
                                                // dot={<circle fill="#7c4dff" />}
                                                type="monotone"
                                                dataKey="value2"
                                                stroke="#7c4dff"
                                                fill="url(#color2)"
                                                strokeWidth={4}
                                            />
                                            <Area
                                                // dot={<circle fill="#00ff99" />}
                                                type="monotone"
                                                dataKey="value3"
                                                stroke="#00ff99"
                                                fill="url(#color3)"
                                                strokeWidth={4}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="liquidity_staking">
                                <div className="graph_box">
                                    <div className="graph_box_header">
                                        <h3>Monthly Report</h3>
                                        <p><img src={logo} alt="logo" />2895 <span>KRZ</span></p>
                                    </div>
                                    <ResponsiveContainer width="100%" height={document.body.clientWidth > 767 ? 400 : 200}>
                                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#ff00ff" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#ff00ff" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                            <XAxis dataKey="date" stroke="#ccc" />
                                            <YAxis stroke="#ccc" />
                                            <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                            <Area
                                                dot={<circle r={6} fill="#ff00ff" strokeWidth={10} />}
                                                type="monotone" dataKey="value1" stroke="#ff00ff" fill="url(#purpleGradient)" strokeWidth={4} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="crash_game">
                                <div className="graph_box">
                                    <div className="graph_box_header">
                                        <h3>Monthly Report</h3>
                                        <p><img src={logo} alt="logo" />2895 <span>KRZ</span></p>
                                    </div>
                                    <ResponsiveContainer width="100%" height={document.body.clientWidth > 767 ? 400 : 200}>
                                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="cyanGreenGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#00ffc8" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#00ffc8" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                            <XAxis dataKey="date" stroke="#ccc" />
                                            <YAxis stroke="#ccc" />
                                            <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                            {/* <Legend verticalAlign="top" height={36} /> */}
                                            <Area
                                                dot={<circle r={6} fill="#00ffc8" strokeWidth={10} />}
                                                type="monotone" dataKey="value1" stroke="#00ffc8" fill="url(#cyanGreenGradient)" strokeWidth={4} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="off_chain_activities">
                                <div className="graph_box">
                                    <div className="graph_box_header">
                                        <h3>Monthly Report</h3>
                                        <p><img src={logo} alt="logo" />2895 <span>KRZ</span></p>
                                    </div>
                                    <ResponsiveContainer width="100%" height={document.body.clientWidth > 767 ? 400 : 200}>
                                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#F5EB67" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#F5EB67" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                            <XAxis dataKey="date" stroke="#ccc" />
                                            <YAxis stroke="#ccc" />
                                            <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                            {/* <Legend verticalAlign="top" height={36} /> */}
                                            <Area
                                                dot={<circle r={6} fill="#F5EB67" strokeWidth={10} />}
                                                type="monotone" dataKey="value1" stroke="#F5EB67" fill="url(#yellowGradient)" strokeWidth={4} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </section>
    )
}

export default Graphs
