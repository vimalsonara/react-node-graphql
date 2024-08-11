import { useState, createContext, useContext } from "react";

type User = {
  name: string;
  email: string;
  token: string;
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

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
