import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../types/user";

interface AuthForm {
  username: string;
  password: string;
}

// this component will be used in AuthProvider below
// undefinded is default value for an object
const AuthContext =
  React.createContext<
    | {
        user: User | null;
        register: (form: AuthForm) => Promise<void>;
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // specify it as User type or null
  const [user, setUser] = useState<User | null>(null);
  // both usage of setUser are correct
  // if both the input variable and the called function's arguments are the same, then we can shorten it with the function name
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user)); // same as below
  const register = (form: AuthForm) => auth.register(form).then(setUser); // same as above
  const logout = () => auth.logout().then(() => setUser(null));
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// TODO - how to use it?
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
