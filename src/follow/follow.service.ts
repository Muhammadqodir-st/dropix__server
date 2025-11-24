import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
    constructor(private prisma: PrismaService) { }


    // get followers
    async getFollowers(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            throw new HttpException('User not found', 404)
        };

        const followers = await this.prisma.follow.findMany({
            where: { followingId: id },
            include: { follower: true }
        });

        return { followers, success: true };
    }


    // get following
    async getFollowing(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            throw new HttpException('User not found', 404)
        };

        const following = await this.prisma.follow.findMany({
            where: { followerId: id },
            include: { following: true }
        });

        return { following, success: true };
    };


    // follow
    async follow(followerId: string, followingId: string) {

        if (followerId === followingId) {
            throw new HttpException('You can\'t track yourself', 400)
        };

        const isAlready = await this.prisma.follow.findFirst({
            where: { followerId, followingId }
        });

        if (isAlready) return isAlready;

        const follow = await this.prisma.follow.create({
            data: { followerId, followingId }
        });

        return { follow, success: true }
    };


    // unfollow
    async unfollow(followerId: string, followingId: string) {
        const unfollow = await this.prisma.follow.deleteMany({
            where: { followerId, followingId }
        });

        return { unfollow, success: true }
    }
}
