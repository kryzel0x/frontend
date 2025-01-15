import { useEffect, useState } from "react";
import MyStakes from "./MyStakes/MyStakes";
import StakingStatement from "./StakingStatement/StakingStatement";
import StartEarning from "./StartEarning/StartEarning";
import { callApiPostMethod } from "../../../services/api.service";
import { APIURL } from "../../../utils/constants";
import { setUserDetails } from "../../../redux/slices/user.slice";
import { UserDetails } from "../../../utils/utils";
import { AppDispatch, RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useKeylessAccounts } from "../../../core/useKeylessAccounts";
import CongratulationsModal from "../../common/modals/CongratulationsModal/CongratulationsModal";
import Poweredby from "../Homepage/PoweredBy/PoweredBy";

const Dashboard = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { activeAccount } = useKeylessAccounts();

  const userDetails = useAppSelector(
    (state: RootState) => state.user.userDetails
  ) as UserDetails;

  const [showCong, setShowCong] = useState(false);

  useEffect(() => {
    const handleUpdateWalletAddress = async () => {
      const dataToSend = {
        walletAddress: activeAccount?.accountAddress.toString(),
      };

      const res  : any= await dispatch(
        callApiPostMethod(APIURL.PROFILE, dataToSend, {}, false, false)
      );

      if (!res.error) {
        dispatch(
          setUserDetails({
            ...userDetails, // Spread existing userDetails
            walletAddress: dataToSend.walletAddress, // Update only walletAddress
          })
        );
        setShowCong(true);
      }
    };

    if (!userDetails.walletAddress && activeAccount) {
      handleUpdateWalletAddress();
    }
  }, [activeAccount, dispatch, userDetails]);

  return (
    <>
      <StartEarning />
      <MyStakes />
      <StakingStatement />
      <Poweredby showIcon />
      <CongratulationsModal
        show={showCong}
        handleClose={() => setShowCong(false)}
      />
    </>
  );
};

export default Dashboard;
