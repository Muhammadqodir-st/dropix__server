import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        try {
            const like = await this.prisma.like.findMany()

            return { like }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findById(postId: string) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            });

            if (!post) {
                throw new HttpException('Post not found', 404)
            }

            const count = await this.prisma.like.count({
                where: { postId }
            })

            return { likes: count }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createLike(postId: string, userId: string) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            })

            if (!post) {
                throw new HttpException('Post not found', 404)
            }

            const existing = await this.prisma.like.findFirst({
                where: { userId, postId }
            })

            if (existing) {
                await this.prisma.like.delete({
                    where: { id: existing.id }
                })

                const count = await this.prisma.like.count({
                    where: { postId }
                })

                return { success: false, likes: count }
            }

            await this.prisma.like.create({
                data: { userId, postId }
            })

            const count = await this.prisma.like.count({
                where: { postId }
            })

            return { success: true, likes: count }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
