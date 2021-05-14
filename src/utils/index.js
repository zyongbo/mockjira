// !!value is to convert value to be boolean version
import { useEffect } from "react";

export const isValidValue = (value) => (value === 0 ? true : !!value);

// when you write a function, do not try to change the object itself
export const cleanObject = (object) => {
  // const result = Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // value might be 0, and 0 is a valid value, should not be false
    // if (!value) { // will be replaced by below
    if (!isValidValue(value)) {
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
export const useMount = (callback) => {
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
