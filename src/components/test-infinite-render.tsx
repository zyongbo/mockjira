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
