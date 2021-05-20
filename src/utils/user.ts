import { useHttp } from "utils/http";
import { User } from "types/user";
import { useAsync } from "./use-async";
import { Project } from "../types/projects";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useUsers = (debounceParam?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(debounceParam || {}) }));
  }, [debounceParam]);

  return result;
};
