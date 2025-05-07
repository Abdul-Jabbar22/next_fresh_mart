// /context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const register = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/api/auth/register", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
