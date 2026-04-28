import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../../Context/LoginContext";

function ProtectedRoute({ children }) {
  const { isAuth} = useAuth();
 if (isAuth===null) { return <>loading</>}
   if (isAuth===false) return <Navigate to="/auth" replace />;

  return children;
}
export default ProtectedRoute;
