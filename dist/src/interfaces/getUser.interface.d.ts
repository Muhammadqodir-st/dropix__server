import { Request } from "express";
export interface Req__with__user extends Request {
    user: {
        id: string;
        name: string;
        email: string;
    };
}
