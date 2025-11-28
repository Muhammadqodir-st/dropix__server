import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    findAll() {
        return
    }

    @Get(":id")
    findId() {
        return
    }

    @Post("create")
    createPost() {
        return
    }

    @Patch(":id")
    updateById() {
        return
    }

    @Delete(":id")
    deleteById() {
        return
    }

    @Delete('delete')
    deleteAll() {
        return
    }
}
