import Banner from "./Banner/Banner";
import "./Homepage.scss";
import LeaderBoardSec from "./LeaderBoardSec/LeaderBoardSec";
import RevenuePool from "./RevenuePool/RevenuePool";
import Standings from "./Standings/Standings";

const Homepage = () => {
    return (
        <>
            <Banner />
            <LeaderBoardSec />
            <Standings />
            <RevenuePool />
        </>
    )
}

export default Homepage
