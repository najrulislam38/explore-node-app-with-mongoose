export interface IAddress {
  city: string;
  street: string;
  zipcode: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  role: "user" | "admin" | "superuser";
  address: IAddress;
}

export interface UserInstanceMethods {
  hashPassword(password: string): string;
}
