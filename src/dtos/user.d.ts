type UserAPIRole = "ADMIN" | "MEMBER";

export type UserAPIResponse = {
  token: string;
  role: UserAPIRole;
  id: string;
  name: string;
  email: string;
};
