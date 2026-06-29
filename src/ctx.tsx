import { use, createContext, type PropsWithChildren } from "react";
import { authClient } from "@/lib/auth-client";

import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  session?: {} | null;
  isLoading: boolean;
} | null>(null);

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          // sign in logic here
          const authResult = await authClient.signIn.email({
            email,
            password,
          });
          if (authResult.data) {
            setSession(authResult.data.token);
            return true;
          }
          return false;
        },
        signOut: async () => {
          const authResult = await authClient.signOut();
          if (authResult.data) {
            setSession(null);
            return true;
          }
          return false;
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
