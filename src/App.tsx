import { Toaster } from "react-hot-toast";
import Application from "./Application";
import Loader from "./components/common/Loader/Loader";
import { AppDispatch, RootState } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
// import Particles from "./components/common/Particles/Particles";
import { setComponentLoading, setLoading } from "./redux/slices/loading.slice";
import { useEffect } from "react";

function App() {
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.loading.loading);
    useEffect(() => {
        dispatch(setLoading(false))
        dispatch(setComponentLoading(false))
    }, [dispatch])
    return (
        <>
            {isLoading && <Loader />}
            {/* <Particles /> */}
            <Toaster />
            <Application />
        </>
    );
}

export default App;
