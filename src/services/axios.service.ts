/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";
import toast from "react-hot-toast";
import { formatUrl } from "./common.service";
// import { setLoading } from "../redux/slices/loading.slice";
import { setComponentLoading, setLoading } from "../redux/slices/loading.slice";
import Swal from "sweetalert2";
import store from "../redux/store";
import { logOut } from "../redux/Actions/user.action";
import { RESPONSES } from "../utils/utils";
import { BASE_URL } from "../utils/constants";

export const storeInstance = store;
axios.defaults.baseURL = BASE_URL;

let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**AXIOS INTERCEPTOR */
axios.interceptors.request.use(
  (config) => {
    const token = storeInstance.getState().user.token || "";
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => {
    return error;
  }
);

/**HANDLE AXIOS RESPONSE */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error("Server not responding. Please try again later.", {
        id: "serverNotResponding",
      });
      store.dispatch(setLoading(false))
      store.dispatch(setComponentLoading(false))
    } else {
      return manageErrorConnection(error);
    }

    const originalRequest = error.config;
    failedQueue.push(originalRequest);
    // CommonService.handleJWTExpiry(error)
    if (error.response.status === 403) {
      processQueue(error, null);
    }
  }
);
/**HANDLE AXIOS ERROR */
function manageErrorConnection(err: any) {
  const accountBlocked = err.response?.data?.message.split("until")[0];
  if (
    err.response &&
    err.response.status >= 400 &&
    err.response.status <= 500
  ) {
    toast.error(err.response.data.message == 'Unauthorized' ? 'Session Expired' : err.response.data.message, { id: "errMessage" });
    if (err.response.status === 401) {
      setTimeout(function () {
        store.dispatch(logOut(false));
      }, 1000);
    }
    if (accountBlocked === "Account blocked") {
      Swal.fire({
        title: "You are temporary blocked",
        text: `${err.response?.data?.message}`,
        icon: "info",
      }).then(async () => {
        store.dispatch(logOut(false));
        toast.dismiss();
        return Promise.reject(err);
      });
    }
    return Promise.reject(err);
  } else if (err.code === "ECONNREFUSED") {
    toast.error("ECONNREFUSED");
    return "nevermind";
  } else {
    toast.error(err, { id: "err" });
    return Promise.reject(err);
  }
}

// /**HANDLE AXIOS SUCCESS */
function handleSuccess(res: any) {
  if (res?.data?.error === false) {
    res?.data?.message && toast.success(res.data.message);
  } else if (res?.data?.error === true) {
    res?.data?.message && toast.error(res.data.message);
  } else if (res.response.status === RESPONSES.UN_AUTHORIZED) {
    res.response?.data?.message && toast.error("Session Expired", { id: "unauthorized" });
    localStorage.clear();
  } else {
    res?.data?.message && toast.error(res.data.message, { id: "successElse" });
  }
}

/**METHOD FOR CALL API */
export const apiCallPost = (
  url: string,
  data = {},
  params = {},
  showtoast = false
) =>
  new Promise((resolve) => {
    // showLoader && storeInstance.dispatch(setLoading(true));

    axios
      .post(formatUrl(url, params), data, { timeout: 50000 })
      .then((res) => {
        // showLoader && storeInstance.dispatch(setLoading(false));
        showtoast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        storeInstance.dispatch(setLoading(false));
        resolve(error.response.data);
      });
  });

/**METHOD FOR CALL API */
export const apiCallPatch = (
  url: string,
  data = {},
  params = {},
  showtoast = false
) =>
  new Promise((resolve) => {
    // showLoader && storeInstance.dispatch(setLoading(true));

    axios
      .patch(formatUrl(url, params), data, { timeout: 50000 })
      .then((res) => {
        // showLoader && storeInstance.dispatch(setLoading(false));
        showtoast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        storeInstance.dispatch(setLoading(false));
        resolve(error.response.data);
      });
  });

/**METHOD FOR CALL API */
export const apiCallDelete = (
  url: string,
  data = {},
  params = {},
  showtoast = false
) =>
  new Promise((resolve) => {
    axios
      .delete(formatUrl(url, params), { data })
      .then((res) => {
        showtoast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        resolve(error.response.data);
      });
  });

/**METHOD FOR SEND API */
export const apiCallGet = (url: string, params = {}, showtoast = false) =>
  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params), { timeout: 50000 })
      .then((res) => {
        showtoast && handleSuccess(res);
        resolve(res.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
