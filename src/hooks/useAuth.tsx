import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../app/utils/Constants";

type User = string | null;

interface AuthContextType {
  user: User;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User>(TOKEN_KEY, null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname !== "/home") {
      navigate("/home", { replace: true });
    }
  }, [user, navigate, location]);

  const login = async (token: string) => {
    setUser(token);
    navigate("/home");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
