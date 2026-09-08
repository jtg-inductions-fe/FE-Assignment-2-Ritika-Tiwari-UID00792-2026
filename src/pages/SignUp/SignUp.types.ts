export type UserRole = 'customer' | 'owner';
export interface SignupFormData {
    id: string;
    role: UserRole;
    name: string;
    email: string;
    confirmPassword?: string;
    password: string;
}
