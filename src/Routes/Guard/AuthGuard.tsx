import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../utils/hooks";
import { RootState } from "../../redux/store";

interface RequireAuthProps {
    children: ReactNode;
}
/**AUTHGAURD FOR INNER PAGES */
export const RequireAuth = ({ children }: RequireAuthProps) => {
    const isLogin = useAppSelector((state: RootState) => state.user.token);
    //   return children;
    return isLogin ? <>{children}</> : <Navigate to={'/'} />
};

