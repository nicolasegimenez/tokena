import { useEffect } from "react";
import { useAuth as useCrossmintAuthHook } from "@crossmint/client-sdk-react-ui";
import { useAuth as useAppAuth } from "@/lib/auth";

export function useCrossmintAuth() {
  const crossmint = useCrossmintAuthHook();
  const appAuth = useAppAuth();

  useEffect(() => {
    if (crossmint.user && !appAuth.isAuthenticated) {
      appAuth.login({
        id: crossmint.user.id,
        name:
          crossmint.user.email ||
          crossmint.user.farcaster?.displayName ||
          crossmint.user.twitter?.username ||
          `User ${crossmint.user.id.slice(0, 6)}`,
        email: crossmint.user.email || "",
        avatarUrl: crossmint.user.farcaster?.pfpUrl,
        crossmintUserId: crossmint.user.id,
        phone: crossmint.user.phoneNumber,
        farcaster: crossmint.user.farcaster
          ? {
              fid: crossmint.user.farcaster.fid,
              username: crossmint.user.farcaster.username,
            }
          : undefined,
      });
    } else if (!crossmint.user && appAuth.isAuthenticated) {
      appAuth.logout();
    }
  }, [crossmint.user, appAuth.isAuthenticated]);

  return {
    login: crossmint.login,
    logout: crossmint.logout,
    user: crossmint.user,
    jwt: crossmint.jwt,
    status: crossmint.status,

    isAuthenticated: !!crossmint.user,
    isLoading:
      crossmint.status === "in-progress" || crossmint.status === "initializing",
  };
}
