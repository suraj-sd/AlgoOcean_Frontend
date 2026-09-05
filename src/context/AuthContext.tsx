import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser
} from "../api/auth.api";

import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();

        setUser(response.data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    const response = await loginUser({
      email,
      password
    });

    localStorage.setItem(
      "token",
      response.data.token
    );

    setUser(response.data.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await registerUser({
      name,
      email,
      password
    });

    localStorage.setItem(
      "token",
      response.data.token
    );

    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};