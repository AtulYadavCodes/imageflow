import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../../Context/LoginContext";

import DashboardPage from "../pages/DashboardPage";
function ProtectedRoute({ children }) {
  const { isAuth} = useAuth();
 if (isAuth===null)  return <></>
   if (isAuth===false) return <Navigate to="/" replace />;

  return children;
}
export default ProtectedRoute;
