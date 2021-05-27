import { useAsync } from "./use-async";
import { Project } from "../types/project";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProjects = (debounceParam?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(debounceParam || {}) }));
  }, [debounceParam]);

  return result;
};
