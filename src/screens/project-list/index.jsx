import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject } from "../../utils";
import qs from "qs";

// when we execute npm start, web package will read variables in .env.development
// when we execute npm run build, web package will read variables in .env
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // used to control the selection behavior for project name and project manager
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    // use `` here if it has variables to be replaced inside
    // if there are too many params, then the url will very long, so we use qs to simplify it
    // if param is empty, then qs.stringify will make sure it returns empty as url parameters
    // fetch(`${apiUrl}/projects?name={param.name}&personId={param.personId}`).then(async response => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    })
  }, [param]);

  // depends on [] because we only want to initialize users once
  useEffect(() => {
    // use `` here if it has variables to be replaced inside
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    })
  }, [])

  return(
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
}