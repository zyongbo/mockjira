import { useEffect, useRef, useState } from "react";

// !!value is to convert value to be boolean version
// ts expects you to specify one so that you are aware of it
export const isValidValue = (value: unknown) => (value === 0 ? true : !!value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "" ? true : false;

// when you write a function, do not try to change the object itself
// object: object means it can be anything like {} or function or any object in TS/JS
// in order to make it as {key: value} object, we have to change the type from object to { [key: string]: unknown }
export const cleanObject = (object: { [key: string]: unknown }) => {
  // const result = Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // value might be 0, and 0 is a valid value, should not be false
    // if (!value) { // will be replaced by below
    // when value is false, it may also delete it
    // if (!isValidValue(value)) {
    if (isVoid(value)) {
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
    // TODO 依赖项里加callback会造成无限循环，这个和useCallback以及和useMemo有关系
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
export const useDebounce = <V>(value: V, delay?: number) => {
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 如果用useRef保存一个值，那么这个值在整个函数周期中都是不会变化的
  const oldTitle = useRef(document.title).current;
  // 页面加载时: 旧title
  // 加载后：新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};
