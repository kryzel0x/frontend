import { useEffect, useRef, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import profile from "../../../assets/images/profile.png";
import logo from "../../../assets/logo/logo.png";
import smallLogo from "../../../assets/logo/small-logo-hd.png";
import { aptosClient, KRYZEL_COIN } from "../../../core/constants";
import { useKeylessAccounts } from "../../../core/useKeylessAccounts";
import { callApiGetMethod } from "../../../redux/Actions/api.action";
import {
  setAptBalance,
  setAptDecimals,
  setKrzBalance,
  setKrzDecimals,
  setUserDetails,
} from "../../../redux/slices/user.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { APIURL, ROUTES } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { clsx, UserDetails } from "../../../utils/utils";
import Button from "../Button/Button";
import Login from "../modals/Login/Login";
import "./Header.scss";
import { handleGetUserStakes } from "../../../services/aptos.service";
import { formatAmount } from "../../../services/common.service";

const Header = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { activeAccount } = useKeylessAccounts();
  const isLogin = useAppSelector((state: RootState) => state.user.token);
  const userDetails = useAppSelector(
    (state: RootState) => state.user.userDetails
  ) as UserDetails;
  const krzBalance = useAppSelector(
    (state: RootState) => state.user.krzBalance
  );
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(window.scrollY);
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    const handleGetProfile = async () => {
      const res = await dispatch(
        callApiGetMethod(APIURL.PROFILE, {}, false, false)
      );
      if (!res.error) dispatch(setUserDetails(res?.result?.userDetails));
    };
    if (isLogin) {
      handleGetProfile();
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const amount = await aptosClient.getAccountCoinsData({
          accountAddress: activeAccount?.accountAddress.toString(),
        });

        // Find the specific asset with the matching type
        const aptosCoinData = amount.find(
          (coin) => coin.asset_type === "0x1::aptos_coin::AptosCoin"
        );

        const krzCoinData = amount.find(
          (coin) => coin.asset_type === KRYZEL_COIN
        );

        if (aptosCoinData) {
          // Dispatch to Redux with the balance
          dispatch(
            setAptBalance(
              aptosCoinData.amount /
                Math.pow(10, aptosCoinData.metadata.decimals)
            )
          );
          dispatch(setAptDecimals(aptosCoinData.metadata.decimals));
        } else {
          console.warn("Aptos Coin not found in the account data");
        }

        if (krzCoinData) {
          dispatch(
            setKrzBalance(
              krzCoinData.amount / Math.pow(10, krzCoinData.metadata.decimals)
            )
          );

          dispatch(setKrzDecimals(krzCoinData.metadata.decimals));
        } else {
          console.warn("KRZ Coin not found in the account data");
        }
      } catch (error) {
        console.error("Error fetching account coins data:", error);
      }
    };

    if (activeAccount && isLogin) {
      getBalance();
    }
  }, [activeAccount, dispatch, isLogin, pathname]);

  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const cleanImageUrl = userDetails?.profileImage?.split("=")[0];
    setImageSrc(cleanImageUrl || profile);
  }, [userDetails?.profileImage]);

  const handleImageError = () => {
    setImageSrc(userDetails?.profileImage?.split("=")[0]);
  };

  return (
    <header
      className={clsx(
        "header",
        scroll > 0 && "scrolled",
        isLogin && "logged_in"
      )}
    >
      <Container>
        <div className="header_in">
          <Link to={ROUTES.HOME} className="logo">
            <img className="d-sm-inline-block d-none" src={logo} alt="logo" />
            <img className="d-sm-none" src={smallLogo} alt="logo" />
          </Link>
          <div className="header_right">
            {!isLogin ? (
              <Button onClick={() => setShow(true)} className="login_btn">
                Sign in
              </Button>
            ) : (
              <>
                <div className="header_nav">
                  <ul>
                    <li>
                      <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
                    </li>
                    <li>
                      <NavLink to={ROUTES.LEADERBOARDS}>Leaderboard</NavLink>
                    </li>
                    {/* <li>
                      <NavLink to={ROUTES.GAME}>Game</NavLink>
                    </li> */}
                    <li>
                        <NavLink
                          onClick={() => ref.current?.click()}
                          to={`${ROUTES.GAME}?token=${encodeURIComponent(
                            isLogin
                          )}`}
                        >
                          Game
                        </NavLink>
                      </li>
                  </ul>
                </div>
                <div className="balance_txt">
                  <img src={smallLogo} alt="logo" />
                  {formatAmount(krzBalance)}
                  <span>KRZ</span>
                  {/* KRZ */}
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    ref={ref}
                    className={clsx(
                      "profile_btn",
                      pathname.includes(ROUTES.PROFILE) && "active"
                    )}
                    onClickCapture={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      document.body.clientWidth > 991 &&
                        navigate(ROUTES.PROFILE);
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt="profile"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div>{userDetails?.name}</div>
                    {/* <p>
                                                <img src={coin} alt="coin" />
                                            </p> */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <ul>
                      <li>
                        <NavLink
                          onClick={() => ref.current?.click()}
                          to={ROUTES.PROFILE}
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => ref.current?.click()}
                          to={ROUTES.DASHBOARD}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => ref.current?.click()}
                          to={ROUTES.LEADERBOARDS}
                        >
                          Leaderboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => ref.current?.click()}
                          to={`${ROUTES.GAME}?token=${encodeURIComponent(
                            isLogin
                          )}`}
                        >
                          Game
                        </NavLink>
                      </li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </Container>
      <Login show={show} handleClose={() => setShow(false)} />
    </header>
  );
};

export default Header;
