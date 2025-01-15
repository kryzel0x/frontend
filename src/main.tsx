import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import Loader from "./components/common/Loader/Loader.tsx";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
