import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { useAppSelector } from "../../utils/hooks";
import { RootState } from "../../redux/store";


interface WithoutAuthProps {
  children: ReactNode;
}

/**AUTHGAURD FOR OUTER PAGES */
export const WithoutAuth = ({ children }: WithoutAuthProps) => {
  const isLogin = useAppSelector((state: RootState) => state.user.token)
  return !isLogin ? <>{children}</> : <Navigate to={ROUTES.DASHBOARD} />;
}