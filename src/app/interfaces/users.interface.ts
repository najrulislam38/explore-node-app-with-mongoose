export interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  role: "user" | "admin" | "superuser";
}
