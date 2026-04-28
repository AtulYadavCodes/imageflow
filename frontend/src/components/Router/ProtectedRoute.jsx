import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../../Context/LoginContext";

function ProtectedRoute({ children }) {
  const { isAuth} = useAuth();
 if (isAuth===null) { return <div className="h-screen w-full"></div>}
   if (isAuth===false) return <Navigate to="/" replace />;

  return children;
}
export default ProtectedRoute;
