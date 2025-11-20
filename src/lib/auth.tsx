import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  walletAddress?: string;
  chainId?: number;
  ens?: string;
  crossmintUserId?: string;
  phone?: string;
  farcaster?: {
    fid: string;
    username?: string;
  };
  google?: {
    email: string;
  };
};

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user?: Partial<AuthUser>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("demo_auth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("demo_auth_user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("demo_auth_user", JSON.stringify(user));
    else localStorage.removeItem("demo_auth_user");
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      login: (overrides?: Partial<AuthUser>) => {
        const mock: AuthUser = {
          id: "1",
          name: "Nicolas Emanuel",
          email: "nicolas@example.com",
          avatarUrl: undefined,
          ...overrides,
        } as AuthUser;
        setUser(mock);
      },
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
