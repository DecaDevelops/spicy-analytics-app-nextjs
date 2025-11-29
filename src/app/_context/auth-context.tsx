"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthLoader } from "../_components/auth-loader";
import { ensureAuth } from "../action";
type AuthState = {
  username: string;
};
const AuthContext = createContext<undefined | AuthState>(undefined);

type props = {
  children: React.ReactNode;
};
export function AuthContextProvider({ children }: props) {
  const [username, setUsername] = useState("Not logged in user");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await ensureAuth();

        if (result) {
          setUsername("authenticated");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ username }}>
      {loading && <AuthLoader />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used within a contextprovider");

  return ctx;
}
