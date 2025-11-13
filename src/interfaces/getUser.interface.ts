import { Request } from "express"

export interface GetUser extends Request {
    user: {
        name: string,
        email: string
    }
}