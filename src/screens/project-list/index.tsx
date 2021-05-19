import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

// 使用js的同学，大部分错误都在runtime的时候发现的
// 我们希望在静态代码中的时候，就可以发现一些错误 -> 强类型的语言 ts
// when we execute npm start, web package will read variables in .env.development
// when we execute npm run build, web package will read variables in .env
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // used to control the selection behavior for project name and project manager
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  // debounce example
  const debounceParam = useDebounce(param, 200);

  // use useHttp() to replace plain fetch function for http requests
  const client = useHttp();

  // replace param with debounceParam to consume useDebounce() hook
  // axios 和fetch表现不一样，axios可以catch到failure status的异常
  useEffect(() => {
    // use useHttp() to replace plain fetch function for http requests
    client("projects", { data: cleanObject(debounceParam) }).then(setList);

    // use `` here if it has variables to be replaced inside
    // if there are too many params, then the url will very long, so we use qs to simplify it
    // if param is empty, then qs.stringify will make sure it returns empty as url parameters
    // fetch(`${apiUrl}/projects?name={param.name}&personId={param.personId}`).then(async response => {
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`)
    //   .then(async (response) => {
    //     if (response.ok) {
    //       setList(await response.json());
    //     }
    //   })
    //   .catch(() => alert("error happened")); //only catch internet connection and request exception, not for 401, 403, 404, 500, but axios lib is able to catch it
  }, [debounceParam]);

  // depends on [] because we only want to initialize users once
  // how to get rid of the [] array?
  // useEffect(() => {
  //   // use `` here if it has variables to be replaced inside
  //   fetch(`${apiUrl}/users`).then(async response => {
  //     if (response.ok) {
  //       setUsers(await response.json());
  //     }
  //   })
  // }, [])

  useMount(() => {
    // use useHttp() to replace plain fetch function for http requests
    client("users").then(setUsers);

    // use `` here if it has variables to be replaced inside
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
