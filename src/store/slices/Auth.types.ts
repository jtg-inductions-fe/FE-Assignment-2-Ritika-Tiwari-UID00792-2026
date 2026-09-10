import { User } from "@types";

export interface AuthState {
    users: User[];
    currentUser: User | null;
    status: Status;
    isLoggedIn: boolean;
}
export type Status ='idle' | 'pending' | 'succeeded' | 'failed';