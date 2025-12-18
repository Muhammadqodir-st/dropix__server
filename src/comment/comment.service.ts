import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        try {
            const comments = await this.prisma.comment.findMany()

            return { comment: comments }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async fintById(postId: string) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            })

            if (!post) {
                throw new HttpException('Post not found', 404)
            }

            const comment = await this.prisma.comment.findMany({
                where: { postId: post.id },
                include: { user: true }
            })

            return { success: true, comment }
        } catch (error) {

        }
    }

    async createComment(postId: string, data: CommentDto, userId: string) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            })

            if (!post) {
                throw new HttpException('Post not found', 404)
            }

            const comment = await this.prisma.comment.create({
                data: { userId, postId: post.id, text: data.text }
            })

            return { success: true, comment }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteById(commentId, userId) {
        try {
            const comment = await this.prisma.comment.findUnique({
                where: { id: commentId }
            })

            if (!comment) {
                throw new HttpException('Comment not found', 404)
            }

            if (comment.userId !== userId) {
                throw new ForbiddenException('You cannot delete this comment')
            }

            await this.prisma.comment.delete({
                where: { id: commentId }
            })

            return { success: true }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
