import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import "./Layout.scss";

const Layout = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <div className="layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout