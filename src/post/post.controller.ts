import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.postService.findAll()
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    findId(@Param('id') id: string) {
        return this.postService.findById(id)
    }

    @UseGuards(AuthGuard)
    @Post("create")
    @UseInterceptors(FileInterceptor('file'))
    createPost(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Req__with__user,
        @Body() dto: CreatePostDto
    ) {
        return this.postService.createPost(file, req.user.id, dto)
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    updateById() {
        return
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    deleteById(@Param("id") id: string, @Req() req: Req__with__user) {
        return this.postService.deleteById(id, req.user.id)
    }

    @UseGuards(AuthGuard)
    @Delete('delete')
    deleteAll() {
        return this.postService.deleteAll()
    }
}
