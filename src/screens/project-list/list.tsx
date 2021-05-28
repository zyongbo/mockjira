// import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Project } from "../../types/project";
import { User } from "../../types/user";
// react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";

// interface Project {
//   id: string;
//   name: string;
//   personId: string;
//   pin: string;
//   organization: string;
//   created: number;
// }

// interface ListProps {
//   list: Project[];
//   users: User[];
//   isLoading: boolean;
// }

// TableProps<Project> will define list: Project[];
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

// isLoading will be passed as one of Table's props
// List's props includes Table's props and users
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number, pin: boolean) => mutate({ id, pin }).then();
  // const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            // return <Pin checked={project.pin} onCheckedChange={(pin) => {
            //   mutate({ id: project.id, pin: pin });
            // }} />;
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={(pin) => pinProject(project.id, pin)}
              />
            );
            // return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />;
          },
        },
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "项目负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
      // dataSource={list}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           {/*may have undefined.name, so we use *?.name || '未知' to show '未知' when it is undefined*/}
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
