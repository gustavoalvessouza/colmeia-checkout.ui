export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export type UserSignUpData = Pick<IUser, "name" | "email" | "password">;
