
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { setLoading } from "../slices/loading.slice";
import { apiCallDelete, apiCallGet, apiCallPatch, apiCallPost } from "../../services/axios.service";

/**CALL API'S GET METHODS */
export const callApiGetMethod = (
  method: string,
  parms = {},
  loading = true,
  showtoaster: boolean = true
) => {
  return (dispatch: Dispatch = useDispatch()) =>
    new Promise((resolve, reject) => {
      /**SHOW LOADER */
      if (loading) dispatch(setLoading(true));

      /**CALL METHOD */
      apiCallGet(method, parms, showtoaster)
        .then((result) => {
          if (loading) dispatch(setLoading(false));
          resolve(result);
        })
        .catch((err) => {
          if (loading) dispatch(setLoading(false));
          reject(err);
        });
    });
};

/**CALL API'S SEND METHOD */
export const callApiPostMethod = (
  method: string,
  data = {},
  parms = {},
  showtoaster: boolean = true,
  loading: boolean = true
) => {
  return (dispatch: Dispatch = useDispatch()) =>
    new Promise((resolve, reject) => {
      /**SHOW LOADER */
      if (loading) dispatch(setLoading(true));

      /**CALL METHOD */
      apiCallPost(method, data, parms, showtoaster)
        .then((result) => {
          if (loading) dispatch(setLoading(false));
          resolve(result);
        })
        .catch((err) => {
          if (loading) dispatch(setLoading(false));
          reject(err);
        });
    });
};

/**CALL API'S UPDATE METHOD */
export const callApiPatchMethod = (
  method: string,
  data = {},
  parms = {},
  showtoaster: boolean = true,
  loading: boolean = true,
) => {
  return (dispatch: Dispatch = useDispatch()) =>
    new Promise((resolve, reject) => {
      /**SHOW LOADER */
      if (loading) dispatch(setLoading(true));

      /**CALL METHOD */
      apiCallPatch(method, data, parms, showtoaster)
        .then((result) => {
          if (loading) dispatch(setLoading(false));
          resolve(result);
        })
        .catch((err) => {
          if (loading) dispatch(setLoading(false));
          reject(err);
        });
    });
};

/**CALL API'S DELETE METHOD */
export const callApiDeleteMethod = (
  method: string,
  data = {},
  parms = {},
  showtoaster: boolean = true,
  loading: boolean = true,
) => {
  return (dispatch: Dispatch = useDispatch()) =>
    new Promise((resolve, reject) => {
      /**SHOW LOADER */
      if (loading) dispatch(setLoading(true));

      /**CALL METHOD */
      apiCallDelete(method, data, parms, showtoaster)
        .then((result) => {
          if (loading) dispatch(setLoading(false));
          resolve(result);
        })
        .catch((err) => {
          if (loading) dispatch(setLoading(false));
          reject(err);
        });
    });
};
