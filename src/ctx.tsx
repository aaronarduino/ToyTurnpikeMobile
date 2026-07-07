import { use, createContext, type PropsWithChildren } from "react";
import { authClient } from "@/lib/auth-client";

import { useStorageState } from "./useStorageState";
import { IAuthResult } from "./interfaces/auth-interfaces";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<IAuthResult>;
  signUp: (email: string, password: string, name: string) => Promise<IAuthResult>;
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
          const authResult = await authClient.signIn.email({
            email,
            password,
          });
          if (authResult.data) {
            setSession(authResult.data.token);
            return { success: true, error: null };
          }
          return { success: false, error: authResult.error };
        },
        signUp: async (email: string, password: string, name: string) => {
          const authResult = await authClient.signUp.email({
            email,
            password,
            name,
          });
          if (authResult.data) {
            setSession(authResult.data.token);
            return { success: true, error: null };
          }
          return { success: false, error: authResult.error };
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
