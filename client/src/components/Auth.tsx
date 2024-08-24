import { useState, createContext, useContext, useEffect } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContext = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthInit = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContext>(AuthInit);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
