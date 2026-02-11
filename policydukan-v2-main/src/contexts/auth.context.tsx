import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import { AuthContext, AuthContextType } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (newToken: string) => {
    try {
      // Store token
      localStorage.setItem("token", newToken);
      setToken(newToken);

      // Fetch user profile
      const response = await api.get("/auth/me");
      const userData = response.data.data;

      // Store user
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      // Clear token if profile fetch fails
      localStorage.removeItem("token");
      setToken(null);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
