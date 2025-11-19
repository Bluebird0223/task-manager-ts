import type { IUser } from "../types/models";


export const getInitials = (name: string): string =>
    name?.split(' ')?.map(n => n[0])?.join('')?.toUpperCase();

export const findUser = (users: IUser[], id: string | null): IUser | undefined =>
    users.find(u => u._id === id);