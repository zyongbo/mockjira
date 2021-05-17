import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  // assign it with default value so that it is turned into optional
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // can be overwrite in customConfig
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    // if customConfig contains "method: 'POST'", it will overwrite the previous one defined already
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// JS 中的typeof 是在runtime时运行的
// return typeof 1 === 'number'
//
// TS 中的typeof 时在静态环境中运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>

export const useHttp = () => {
  const { user } = useAuth();
  // there's a shorter way to fetch the type of parameters as below
  // return ([endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token});
  // TODO - Parameters is TS utility types
  // Utility type的用法：用泛型给他传入一个其他类型，然后utility typed对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// let myFavoriteNumber: string | number;
// myFavoriteNumber = 'seven';
// myFavoriteNumber = 7;
// TS2322: Type '{}' is not assignable to type 'string | number'.   Type '{}' is not assignable to type 'number'.
// myFavoriteNumber = {};//will error out

// 类型别名
// type FavoriteNumber = string | number;
// let myFavoriteNumber: FavoriteNumber = 6;
// myFavoriteNumber = '6';

// interface Person {
//   name: string;
// }
// ==
// type Person = {name: string};
// const xiaoming: Person = {name: 'xiaoming'};

// 类型别名, interface cannot replace type
// type FavoriteNumber1 = string | number;
// let myFavoriteNumber1: FavoriteNumber1 = 6;

// interface 也没法实现utility type, like Parameters<typeof http>
// type Person = {
//   name: string;
//   age: number;
// }
// in order to make it work, we have to use name?, age? in Person definition
// const xiaoming: Person = {name: 'xiaoming'};
// have the same effects as:
// const xiaoming: Partial<Person> = {name: 'xiaoming'};
// only has age, not name type
// const shenMiRen: Omit<Person, 'name'> = {age: 7};
// const shenMiRen2: Omit<Person, 'name' | 'age'> = {};

// type Person = {
//   name: string;
//   age: number;
// }
// const xiaoMing: Partial<Person> = {};
// const shenMiRen: Omit<Person, "name" | "age"> = {};
// type PersonKeys = keyof Person;
// type PersonOnlyName = Pick<Person, "name" | "age">;
// type Age = Exclude<PersonKeys, "name">;
/**
 * Make all properties in T optional
 */
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
