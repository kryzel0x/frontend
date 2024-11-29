import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import "./Loader.scss";

const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])
    return (
        <div className="over_loader">
            <Spinner />
        </div>
    )
}

export default Loader