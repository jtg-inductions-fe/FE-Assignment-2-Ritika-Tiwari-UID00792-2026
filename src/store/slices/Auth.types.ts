export type UserRole = 'customer' | 'owner';
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface AuthState {
    users: User[];
    currentUser: User | null;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    isLoggedIn: boolean;
}
