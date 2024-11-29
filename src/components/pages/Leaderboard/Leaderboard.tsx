import LeaderBoardSec from "../Homepage/LeaderBoardSec/LeaderBoardSec";
import Standings from "../Homepage/Standings/Standings";
import "./Leaderboard.scss";

const Leaderboard = () => {
    return (
        <>
            <LeaderBoardSec hideheading />
            <Standings className="leaderboard_standings" bottomSpacing />
        </>
    )
}

export default Leaderboard
