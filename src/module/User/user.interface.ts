import { USER_ROLE } from "./user.constants";

export interface TUser {
    id: string;
    email: string;
    password: string;
    role:  'admin' | 'student' | 'teacher';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
  }

  export type TUserRole = keyof typeof USER_ROLE