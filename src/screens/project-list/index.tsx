import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import {
  cleanObject,
  useDebounce,
  useDocumentTitle,
  useMount,
} from "../../utils";
import qs from "qs";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { Project } from "../../types/project";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectsSearchParams } from "./util";

// 使用js的同学，大部分错误都在runtime的时候发现的
// 我们希望在静态代码中的时候，就可以发现一些错误 -> 强类型的语言 ts
// when we execute npm start, web package will read variables in .env.development
// when we execute npm run build, web package will read variables in .env
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // used to control the selection behavior for project name and project manager
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });

  // const [keys, setKeys] = useState<("name" | "personId")[]>([
  //   "name",
  //   "personId",
  // ]);

  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
  // const [param] = useUrlQueryParam(['name', 'personId']);
  // const [param, setParam] = useUrlQueryParam(keys);
  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);

  const [param, setParam] = useProjectsSearchParams();
  // const projectParam = {...param, personId: Number(param.personId) || undefined};

  // debounce example
  // const debounceParam = useDebounce(projectParam, 200);

  // use useHttp() to replace plain fetch function for http requests
  // const client = useHttp();

  // const {run, isLoading, error, data: list} = useAsync<Project[]>();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  // fetch data and assign an alias as users
  const { data: users } = useUsers();

  // replace param with debounceParam to consume useDebounce() hook
  // axios 和fetch表现不一样，axios可以catch到failure status的异常
  // useEffect(() => {
  //   run(client("projects", { data: cleanObject(debounceParam) }));
  // setIsLoading(true);
  // // use useHttp() to replace plain fetch function for http requests
  // client("projects", { data: cleanObject(debounceParam) })
  //   .then(setList)
  //   .catch((error) => {
  //     setList([]);
  //     setError(error);
  //   })
  //   .finally(() => setIsLoading(false));

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
  // }, [debounceParam]);

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

  // useMount(() => {
  // use useHttp() to replace plain fetch function for http requests
  // client("users").then(setUsers);

  // use `` here if it has variables to be replaced inside
  // fetch(`${apiUrl}/users`).then(async (response) => {
  //   if (response.ok) {
  //     setUsers(await response.json());
  //   }
  // });
  // });

  // 2. Method 2 to change the page title
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/*to test the type of value form the evt or input box*/}
      {/*<select onChange={evt => {*/}
      {/*  const value = evt.target.value;*/}
      {/*  console.log(value, typeof value);*/}
      {/*}}>*/}
      {/*  <option value={undefined}>默认选项</option>*/}
      {/*  <option value={1}>第一个选项</option>*/}
      {/*</select>*/}

      {/*<Helmet>*/}
      {/*  <title>项目列表</title>*/}
      {/*</Helmet>*/}
      <h1>项目列表</h1>
      {/*<Button onClick={retry}>retry</Button>*/}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {/*<List users={users} list={list} />*/}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

// track this component only
// debug purpose
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
