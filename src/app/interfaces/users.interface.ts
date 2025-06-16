export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}
