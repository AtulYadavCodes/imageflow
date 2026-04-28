import { useEffect, useState } from "react";

export const useLogin = () => {
  const [isAuth, setIsAuth] = useState(null); // null = unknown

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/v1/users/profile`, {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  return {
    isAuth,
    setIsAuth,
  };
};
