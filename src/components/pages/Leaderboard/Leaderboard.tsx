import { useEffect, useState } from "react";
import LeaderBoardSec from "../Homepage/LeaderBoardSec/LeaderBoardSec";
import Poweredby from "../Homepage/PoweredBy/PoweredBy";
import Standings from "../Homepage/Standings/Standings";
import Graphs from "./Graphs/Graphs";
import "./Leaderboard.scss";
import { AppDispatch, RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { callApiGetMethod } from "../../../redux/Actions/api.action";
import { APIURL } from "../../../utils/constants";

const Leaderboard = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const walletAddress = useAppSelector((state: RootState) => state.user.userDetails?.walletAddress);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [rankUser, setRankUser] = useState([]);
  useEffect(() => {
    const handleGetLeaderboardData = async () => {
      const res = await dispatch(
        callApiGetMethod(
          APIURL.GETCREDITSCORELIST,
          {
            tail: 10,
            walletAddress
          },
          false,
          false
        )
      );
      if (res && !res.error) {
        setLeaderboardData(res?.result);
        setRankUser([res?.rank])
      }
    };
    handleGetLeaderboardData();
  }, [dispatch]);
  return (
    <>
      <LeaderBoardSec />
      <Graphs />
      <Standings
        title="Standings"
        className="leaderboard_standings"
        bottomSpacing
        isStanding={true}
        leaderboardData={leaderboardData}
        rankUser={rankUser}
      />
      <Poweredby />
    </>
  );
};

export default Leaderboard;
