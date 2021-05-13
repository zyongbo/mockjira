import { useEffect, useState } from "react";

export const SearchPanel = ({param, setParam, users}) => {
  // change to pass param and setParam from constructor
  // const [param, setParam] = useState({
  //   name: '',
  //   personId: ''
  // });
  // because the data passed from backend has the foreign key of users,
  // so we need the data of users to get the users.personName
  // const [users, setUsers] = useState([]);
  // we are supposed to have the list ready for List component so as to render it as a table
  // so, we need to pass this data to List component, then we use lift state to parent component to share
  // const [list, setList] = useState([]);
  //
  // useEffect(() => {
  //   fetch('').then(async response => {
  //     if (response.ok) {
  //       setList(await response.json());
  //     }
  //   })
  // }, [param]);

  return(
    <form>
      {/*setParam(Object.assign({}, param, {name: event.target.value}))*/}
      <input type="text" value={param.name} onChange={event => setParam({
        ...param,
        name: event.target.value
      })}/>
      <select value={param.personId} onChange={event => setParam({
        ...param,
        personId: event.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </form>
  );
}