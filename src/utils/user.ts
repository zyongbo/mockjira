import { useHttp } from "utils/http";
import { User } from "types/user";
import { useAsync } from "./use-async";
import { Project } from "../types/project";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useQuery } from "react-query";

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();
//
//   useEffect(() => {
//     run(client("projects", { data: cleanObject(param || {}) }));
//   }, [param]);
//
//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
