import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../types/user";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";

interface AuthForm {
  username: string;
  password: string;
}

const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // new endpoint 'me' is to get the user currently logged in
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// this component will be used in AuthProvider below
// undefined is default value for an object
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
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  // both usage of setUser are correct
  // if both the input variable and the called function's arguments are the same, then we can shorten it with the function name
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user)); // same as below
  const register = (form: AuthForm) => auth.register(form).then(setUser); // same as above
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    // boostrapUser().then(setUser);
    run(boostrapUser());
  });

  if (isIdle || isLoading) {
    // return(<p>Loading...</p>);
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// TODO - how to use it?
// AuthContext.Provider will be used to wrap all other children elements
// when call useAuth, it will retrieve the AuthContext used in AuthContext.Provider
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
