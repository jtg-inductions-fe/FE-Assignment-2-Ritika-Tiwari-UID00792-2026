export type UserRole = 'customer' | 'owner';
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}