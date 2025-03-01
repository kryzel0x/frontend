import { Container, Nav, Tab } from "react-bootstrap";
import "./Graphs.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../../redux/store";
import { useAppDispatch } from "../../../../utils/hooks";
import { callApiGetMethod } from "../../../../redux/Actions/api.action";
import { APIURL } from "../../../../utils/constants";
import Select from "../../../common/form/Select/Select";

type ReportFilter =
  | "total_balance"
  | "liquidity_staking"
  | "crash_game"
  | "off_chain_activities";

const timeFilterOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const Graphs = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const getFirstDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  };
  // const [startDate, setStartDate] = useState<Date>(getFirstDayOfMonth());
  // const [endDate, setEndDate] = useState<Date>(new Date());
  const [timeFilter, setTimeFilter] = useState(timeFilterOptions[0]);
  const [activeTab, setActiveTab] = useState<ReportFilter>("total_balance");
  const [graphData, setGraphData] = useState<any[]>([]);

  // const onChange = (dates: [Date, Date]) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  const handleTimeFilterChange = (selectedOption: any) => {
    setTimeFilter(selectedOption);
  };

  const handleTabChange = (tab: ReportFilter) => {
    setActiveTab(tab);
  };

  const getReportFilterValue = (tab: ReportFilter) => {
    switch (tab) {
      case "total_balance":
        return "total_balance";
      case "liquidity_staking":
        return "liquidity_staking";
      case "crash_game":
        return "crash_game";
      case "off_chain_activities":
        return "off_chain";
      default:
        return "total_balance";
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchGraphData = async () => {
    // if (!startDate || !endDate) return;

    const res = await dispatch(
      callApiGetMethod(
        APIURL.GRAPH,
        {
          timeFilter: timeFilter.value,
          reportFilter: getReportFilterValue(activeTab),
          // startDate: startDate.toISOString().split("T")[0],
          // endDate: endDate.toISOString().split("T")[0],
        },
        false,
        false
      )
    );

    if (res && !res.error && res.result) {
      setGraphData(res.result);
    }
  };

  useEffect(() => {
    // if (startDate && endDate) {
    fetchGraphData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter, activeTab]);

  const getGradientColors = (tab: ReportFilter) => {
    switch (tab) {
      case "total_balance":
        return {
          colors: ["#00c8ff", "#7c4dff", "#00ff99"],
          ids: ["color1", "color2", "color3"],
        };
      case "liquidity_staking":
        return {
          colors: ["#00c8ff"],
          ids: ["purpleGradient"],
        };
      case "crash_game":
        return {
          colors: ["#7c4dff"],
          ids: ["cyanGreenGradient"],
        };
      case "off_chain_activities":
        return {
          colors: ["#00ff99"],
          ids: ["yellowGradient"],
        };
    }
  };

  return (
    <section className="graphs_design">
      <Container>
        <div className="graphs_in">
          <Tab.Container
            defaultActiveKey="total_balance"
            onSelect={(k) => handleTabChange(k as ReportFilter)}
          >
            <Nav>
              <Nav.Link eventKey="total_balance">Total Balance</Nav.Link>
              <Nav.Link eventKey="liquidity_staking">
                Liquidity Staking
              </Nav.Link>
              <Nav.Link eventKey="crash_game">Crash Game</Nav.Link>
              <Nav.Link eventKey="off_chain_activities">
                Off-Chain Activities
              </Nav.Link>
            </Nav>
            <Tab.Content>
              {[
                "total_balance",
                "liquidity_staking",
                "crash_game",
                "off_chain_activities",
              ].map((tab) => (
                <Tab.Pane key={tab} eventKey={tab}>
                  <div className="graph_box">
                    <div className="graph_box_header">
                      <h3>Report: </h3>
                      <Select
                        className="small_selector my-lg-0 my-4 mx-lg-4"
                        options={timeFilterOptions}
                        value={timeFilter}
                        onChange={handleTimeFilterChange}
                        isSearchable={false}
                      />
                      {/* <div className="position-relative">
                        <DatePicker
                          selected={startDate}
                          onChange={onChange}
                          startDate={startDate}
                          endDate={endDate}
                          selectsRange
                          selectsDisabledDaysInRange
                          className="date_range"
                        />
                      </div> */}
                      {/* <p>
                        <img src={logo} alt="logo" />
                        {formatAmount(2895)} <span>KRZ</span>
                      </p> */}
                    </div>
                    {graphData && graphData.length > 0 ? (
                      <ResponsiveContainer
                        width="100%"
                        height={document.body.clientWidth > 767 ? 400 : 200}
                      >
                        <AreaChart
                          data={graphData}
                          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            {getGradientColors(tab as ReportFilter).colors.map(
                              (color, index) => (
                                <linearGradient
                                  key={index}
                                  id={
                                    getGradientColors(tab as ReportFilter).ids[
                                      index
                                    ]
                                  }
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor={color}
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor={color}
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              )
                            )}
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#2a2a2a"
                          />
                          <XAxis dataKey="date" stroke="#ccc" />
                          <YAxis stroke="#ccc" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#2a2a2a",
                              border: "none",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                          />
                          {tab === "total_balance" ? (
                            <>
                              <Area
                                type="monotone"
                                dataKey="value1"
                                stroke="#00c8ff"
                                fill="url(#color1)"
                                strokeWidth={4}
                              />
                              <Area
                                type="monotone"
                                dataKey="value2"
                                stroke="#7c4dff"
                                fill="url(#color2)"
                                strokeWidth={4}
                              />
                              <Area
                                type="monotone"
                                dataKey="value3"
                                stroke="#00ff99"
                                fill="url(#color3)"
                                strokeWidth={4}
                              />
                            </>
                          ) : (
                            <Area
                              dot={
                                <circle
                                  r={6}
                                  fill={
                                    getGradientColors(tab as ReportFilter)
                                      .colors[0]
                                  }
                                  strokeWidth={10}
                                />
                              }
                              type="monotone"
                              dataKey="value1"
                              stroke={
                                getGradientColors(tab as ReportFilter).colors[0]
                              }
                              fill={`url(#${
                                getGradientColors(tab as ReportFilter).ids[0]
                              })`}
                              strokeWidth={4}
                            />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div
                        className="no-data-container"
                        style={{
                          height: document.body.clientWidth > 767 ? 400 : 200,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          backgroundColor: "rgba(42, 42, 42, 0.5)",
                          borderRadius: "8px",
                        }}
                      >
                        <p
                          style={{
                            color: "#ccc",
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          No data available
                        </p>
                      </div>
                    )}
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </div>
      </Container>
    </section>
  );
};

export default Graphs;
