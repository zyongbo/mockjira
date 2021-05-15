import { useEffect, useState } from "react";

// !!value is to convert value to be boolean version
// ts expects you to specify one so that you are aware of it
export const isValidValue = (value: unknown) => (value === 0 ? true : !!value);

// when you write a function, do not try to change the object itself
export const cleanObject = (object: object) => {
  // const result = Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    // value might be 0, and 0 is a valid value, should not be false
    // if (!value) { // will be replaced by below
    if (!isValidValue(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// Define custom react hooks
// have to use use*
// React will treat it as React hook
// 1. All React hooks (system hooks and custom hooks) can not be called in normal functions
// All React hooks can be called in other hooks!!!
// 2. All React hooks can be called in elements (onChange like events)
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// Define debounce function
// const debounce = (func, delay) => {
//   let timeout;
//   return((...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   });
// }
// const log = debounce( () => {console.log('call')}, 5000);
// log();
// log();
// log();
// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只剩timeout#3在独自等待了

// to config delay as an optional number
// will use generic to return the correct type
export const useDebounce = (value: unknown, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // not report error when value is any type
  // console.log(value.mayNotExist)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, debouncedValue]);

  return debouncedValue;
};
