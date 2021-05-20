import { Form, Input, Select } from "antd";
import { User } from "../../types/user";
// import { useEffect, useState } from "react";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   title: string;
//   organization: string;
//   token: string;
// }

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
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

  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name: event.target.value}))*/}
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
        {/*<Select*/}
        {/*  value={param.personId}*/}
        {/*  onChange={(event) =>*/}
        {/*    setParam({*/}
        {/*      ...param,*/}
        {/*      personId: event.target.value,*/}
        {/*    })*/}
        {/*  }*/}
        {/*>*/}
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
