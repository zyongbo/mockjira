import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

/**
 * 返回url中指定的param的值
 *
 * 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
 * https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
 * useUrlQueryParam will return a new obj everytime it is executed
 * So, we can replace it with useMemo
 *
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const name = searchParams.get('name');
  return [
    // keys.reduce((prev, key) => {
    //   // example: name: 骑手, initial value is {}
    //   return {...prev, [key]: searchParams.get(key) || ''};
    //   // {} is default value
    // }, {} as {[key in K]: string}),
    // when searchParams changes, then useMemo will recalculate the returned obj
    // react hooks will not only compare the address, it will compare the value
    // of the obj to decide if the obj has changed or not
    // when obj is a state variable, react only treat it as changed when the setter is called
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          // example: name: 骑手, initial value is {}
          return { ...prev, [key]: searchParams.get(key) || "" };
          // {} is default value
        }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    // setSearchParams,
    // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    (params: Partial<{ [key in K]: unknown }>) => {
      const obj = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(obj);
    },
  ] as const;
};
