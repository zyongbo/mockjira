import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  Link,
} from "react-router-dom";
import { KanbanScreen } from "../kanban";
import { EpicScreen } from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/*In Link element, if use '/kanban', then it will use root route of current component*/}
      {/*we dont want it this way, we want to link to a relative path, so use 'kanban' instead*/}
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"/kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"/epic"} element={<EpicScreen />} />
        {/*navigate to a default route when above cannot be matched*/}
        <Navigate to={window.location.pathname + "/kanban"} />
      </Routes>
    </div>
  );
};
