import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('follow')
export class FollowController {
    constructor(private followService: FollowService) { }

    // me/followers
    @UseGuards(AuthGuard)
    @Get('me/followers')
    getFollowers(@Req() req) {
        return this.followService.getFollowers(req.user.id)
    }

    // me/following
    @UseGuards(AuthGuard)
    @Get('me/following')
    getFollowing(@Req() req) {
        return this.followService.getFollowing(req.user.id)
    }

    // user followers
    @UseGuards(AuthGuard)
    @Get(':userId/followers')
    getUserFollowers(@Param("userId") userId: string) {
        return this.followService.getFollowers(userId)
    }

    // user following
    @UseGuards(AuthGuard)
    @Get(':userId/following')
    getUserFollowing(@Param("userId") userId: string) {
        return this.followService.getFollowing(userId)
    }

    // follow
    @UseGuards(AuthGuard)
    @Post(':userId')
    follow(@Req() req, @Param("userId") userId: string) {
        return this.followService.follow(req.user.id, userId)
    }

    // unfollow
    @UseGuards(AuthGuard)
    @Delete(':userId')
    unfollow(@Req() req, @Param("userId") userId: string) {
        return this.followService.unfollow(req.user.id, userId)
    }
}
