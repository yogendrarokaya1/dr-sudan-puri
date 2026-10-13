"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { IUser, IAuthResponse } from "@/types";
import { authApi } from "@/lib/api/auth.api";
import { setToken, getToken, removeToken } from "@/lib/utils/cookie";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: IAuthResponse) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setTokenState] = useState<string | null>(
    () => getToken() ?? null
  );
  const [isLoading, setIsLoading] = useState<boolean>(!!getToken());
  const hasFetched = useRef(false);

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await authApi.getProfile();
      setUser(profile);
    } catch {
      removeToken();
      setUser(null);
      setTokenState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Fetch profile once on mount ───────────────
  useEffect(() => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    void refreshProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback((data: IAuthResponse) => {
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};