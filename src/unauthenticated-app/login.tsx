import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   });
  // };

  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // NOT equals to try catch
    // login is async, in order to catch the right error message, we have to use .catch
    // login(values).catch(onError);
    // NOT equals to above, try catch will not catch the correct error message because it is async
    // if you do want to use try catch, use async and await
    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   {/*{user ? (*/}
    //   {/*  <div>*/}
    //   {/*    登录成功，用户名：{user.name}*/}
    //   {/*    token: {user.token}*/}
    //   {/*  </div>*/}
    //   {/*) : null}*/}
    //   <div>
    //     <label htmlFor={"username"}>用户名</label>
    //     <input type={"text"} id={"username"} />
    //   </div>
    //   <div>
    //     <label htmlFor={"password"}>密码</label>
    //     <input type={"password"} id={"password"} />
    //   </div>
    //   {/*this is the action from the form*/}
    //   <div>
    //     <button type={"submit"}>登录</button>
    //   </div>
    // </form>
    // switch to use antd
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type={"text"} id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type={"password"} id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
