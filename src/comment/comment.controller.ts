import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get()
    findAll() {
        return this.commentService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.commentService.fintById(id,)
    }

    @UseGuards(AuthGuard)
    @Post('create/:id')
    createComment(@Param('id') id: string, @Body() dto: CommentDto, @Req() req: Req__with__user) {
        return this.commentService.createComment(id, dto, req.user.id)
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    deleteById(@Param('id') id: string, @Req() req: Req__with__user) {
        return this.commentService.deleteById(id, req.user.id)
    }
}
