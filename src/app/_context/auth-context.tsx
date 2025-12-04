"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthLoader } from "../_components/auth-loader";
import { existsBearerToken } from "../../../service/bearer-token";
// import { ensureAuth } from "../___action";
type AuthState = {
  username: string;
  isLoggedIn: boolean;
};
const AuthContext = createContext<undefined | AuthState>(undefined);

type props = {
  children: React.ReactNode;
};
export function AuthContextProvider({ children }: props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("not implemented yet");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBearerToken() {
      setLoading(true);
      const res = await existsBearerToken();
      setIsLoggedIn(res);
      setLoading(false);
    }
    getBearerToken();
  }, []);
  return (
    <AuthContext.Provider value={{ username, isLoggedIn }}>
      {loading && <AuthLoader />}

      {!loading && !isLoggedIn && <AuthLoader NotLoggedIn={true} />}
      {!loading && children}
    </AuthContext.Provider>
  );
  // }
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used within a contextprovider");

  return ctx;
}
