import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import "./Layout.scss";
import { ROUTES } from "../../../utils/constants";
import { useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../redux/store";
import { useKeylessAccounts } from "../../../core/useKeylessAccounts";

const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const token = useAppSelector((state: RootState) => state.user.token);

  const switchKeylessAccount = useKeylessAccounts(
    (state) => state.switchKeylessAccount
  );
  useEffect(() => {
    async function deriveAccount(token: string) {
      await switchKeylessAccount(token);
    }
    deriveAccount(token);
  }, [token, switchKeylessAccount]);
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      {pathname !== ROUTES.REGISTER_PROCESS && <Footer />}
    </div>
  );
};

export default Layout;
