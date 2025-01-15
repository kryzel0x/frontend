import toast from "react-hot-toast";
import {
  logoutUser,
} from "../slices/user.slice";

// Logout Function
export const logOut =
  (message = true) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (dispatch: any) => {
      try {
        await dispatch(logoutUser());
        if (message) {
          toast.success("Logged out successfully", { id: "logoutSuccess" });
        }
      } catch (error) {
        if (error instanceof Error) {
          return toast.error(error.message, { id: "logoutError" });
        }
      }
    };
