import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import LeaderBoardSec from "./LeaderBoardSec/LeaderBoardSec";
import RevenuePool from "./RevenuePool/RevenuePool";
import Standings from "./Standings/Standings";
import "./Homepage.scss";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { callApiPostMethod } from "../../../services/api.service";
import { APIURL } from "../../../utils/constants";
import { AppDispatch } from "../../../redux/store";
import {
  setDeploying,
  setRemainingTime,
  setTempToken,
  setUserDetails,
  token,
} from "../../../redux/slices/user.slice";
import { setLoading } from "../../../redux/slices/loading.slice";
import RegisterationProcess from "../RegisterationProcess/RegisterationProcess";
import PoweredBy from "./PoweredBy/PoweredBy";
import { callApiGetMethod } from "../../../redux/Actions/api.action";

const Homepage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [showDeployingComponent, setShowDeployingComponent] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { tempToken, deploying, remainingTime } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    const verifyToken = async () => {
      const urlHash = window.location.hash;
      const params = new URLSearchParams(urlHash.substring(1));
      const idToken = params.get("id_token");
      if (idToken) {
        try {
          dispatch(setLoading(true));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res: any = await dispatch(
            callApiPostMethod(APIURL.GOOGLELOGIN, { token: idToken }, {}, false)
          );

          if (!res.error) {
            if (res.result && res.result?.userDetails?.walletAddress) {
              dispatch(setUserDetails(res?.result?.userDetails));
              dispatch(token(idToken));
            } else {
              dispatch(setUserDetails(res?.result?.userDetails));
              dispatch(setTempToken(idToken));
              dispatch(setDeploying(true));
              dispatch(setLoading(false));
              dispatch(setRemainingTime(5));
            }
          } else {
            if (window.location.hash.includes("id_token")) {
              // Remove the fragment
              const newUrl = window.location.href.split("#")[0];
              window.history.replaceState(null, "", newUrl);
            }
          }
        } catch (error) {
          dispatch(setLoading(false));
          console.error("API call failed:", error);
        }
      }
    };
    verifyToken();
  }, [dispatch]);

  useEffect(() => {
    if (deploying && tempToken) {
      setShowDeployingComponent(true);
      const intervalId = setInterval(() => {
        if (remainingTime > 0) {
          dispatch(setRemainingTime(remainingTime - 1));
        } else {
          dispatch(token(tempToken));
          setShowDeployingComponent(false);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [deploying, remainingTime, dispatch, tempToken]);

  useEffect(() => {
    const handleGetLeaderboardData = async () => {
      const res = await dispatch(
        callApiGetMethod(
          APIURL.GETCREDITSCORELIST,
          {
            tail: 10,
          },
          false,
          false
        )
      );
      if(res && !res.error){
          setLeaderboardData(res.result)
      }
    };
    handleGetLeaderboardData();
  }, [dispatch]);

  return showDeployingComponent ? (
    <RegisterationProcess />
  ) : (
    <>
      <Banner />
      {/* <LeaderBoardSec /> */}
      <Standings leaderboardData={leaderboardData}/>
      {/* <Features /> */}
      <RevenuePool />
      <PoweredBy />
    </>
  );
};

export default Homepage;
