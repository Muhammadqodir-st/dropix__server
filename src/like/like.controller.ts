import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) { }

    @Get()
    findAll() {
        return this.likeService.findAll()
    }

    @Get(":id")
    findById(@Param('id') id: string) {
        return this.likeService.findById(id)
    }

    @UseGuards(AuthGuard)
    @Post('create')
    createLike(@Body() dto: LikeDto, @Req() req: Req__with__user) {
        return this.likeService.createLike(dto.postId, req.user.id)
    }
}
