// AuthContext.js
import { createContext, useContext } from "react";
import { useLogin } from "./Hookcustom/useLogin";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuth,setIsAuth} = useLogin(); // ✅ only place hook is used

  return (
    <AuthContext.Provider value={{ isAuth,setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);