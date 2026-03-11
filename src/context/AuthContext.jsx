import { createContext, useContext, useState, useEffect } from "react";
import { authAPI, userAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we have a token and fetch profile
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      userAPI
        .getProfile()
        .then((res) => setUser(res.data.data.user))
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (identifier, password) => {
    const res = await authAPI.login({ identifier, password });
    const { user: userData, accessToken, refreshToken } = res.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(userData);
    return userData;
  };

  const register = async (payload) => {
    const res = await authAPI.register(payload);
    return res.data;
  };

  const verifyOTP = async (phone, otp) => {
    const res = await authAPI.verifyOTP({ phone, otp });
    const { user: userData, accessToken, refreshToken } = res.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(userData);
    return userData;
  };

  const sendOTP = async (phone) => {
    const res = await authAPI.sendOTP({ phone });
    return res.data;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore errors
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await userAPI.getProfile();
      setUser(res.data.data.user);
    } catch {
      // ignore
    }
  };

  // Derive role from user, default to "guest"
  const role = user?.role?.toLowerCase() || "guest";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        register,
        verifyOTP,
        sendOTP,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
