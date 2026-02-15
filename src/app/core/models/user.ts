export interface User {
    id:number;
    fullName: string;
    email:string;
    password:string;
    status:String;
    dateJoined:Date;

    role:'Admin'|'User';
}
