export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    status: string;
    dateJoined: Date;
    role: 'Admin' | 'User';
}
