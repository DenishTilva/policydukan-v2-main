import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "manager" | "agent";
  tenantId?: string;
  tenantName?: string;
  subscriptionStatus?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
