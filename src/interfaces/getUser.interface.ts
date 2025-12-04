import { Request } from "express"
import { CreatePostDto } from "src/post/dto/create-post.dto"

export interface Req__with__user extends Request {
    user: {
        id: string
        name: string,
        email: string
    }
}