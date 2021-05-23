import { useEffect, useState } from "react";

/**
 * @constructor
 *
 * everytime, the state value changed, then the component will be rerendered
 * when this component rendered then useEffect will execute once, which will set num + 1
 * then the component will be rerendered, in the second render, the obj will be created again with the same value
 * but the obj in these two renderings have the same value but different references
 * So, the useEffect will be triggered again
 *
 * If we change obj = 1, then it will be the same which will not cause the useEffect executed again
 *
 */
export default function TestApp() {
  const obj = { name: "Jack" };
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("effect");
    setNum(num + 1);
  }, [obj]);

  return (
    <div>
      {num}
      <h1>Hello, Test for Infinite Rendering</h1>
    </div>
  );
}

const obj = {
  data: ["hello", "world"],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

// for (let o of obj) {
//   console.log(o);
// }
