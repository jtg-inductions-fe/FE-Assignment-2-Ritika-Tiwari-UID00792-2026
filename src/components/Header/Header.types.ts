export interface HeaderProps {
    user: User;
    cartCount: number;
}
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}
