import { Document } from 'mongoose';
export declare class User extends Document {
    userId: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    hash: string;
}
export declare const UserSchema: any;
