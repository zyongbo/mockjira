// TODO 把所有id都改成number类型
export interface User {
  // change to number since the returned data is number
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
