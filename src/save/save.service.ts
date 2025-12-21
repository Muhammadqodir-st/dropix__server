import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveDto } from './dto/save.dto';

@Injectable()
export class SaveService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        try {
            const save = await this.prisma.save.findMany()

            return { save }
        } catch (error) {
            throw new HttpException('Internal Server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findById(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { saves: true }
            })

            if (!user) {
                throw new HttpException("User not found", 404)
            }

            return { save: user.saves }
        } catch (error) {
            throw new HttpException('Internal Server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async create(userId, data: SaveDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            })

            if (!user) {
                throw new HttpException("User not found", 404)
            }

            const post = await this.prisma.post.findUnique({
                where: { id: data.postId }
            })

            if (!post) {
                throw new HttpException("Post not found", 404)
            }

            const existing = await this.prisma.save.findFirst({
                where: { userId, postId: data.postId }
            })

            if (existing) {
                await this.prisma.save.delete({
                    where: { id: existing.id }
                })

                return {message:'deleted'}
            }

            const saved = await this.prisma.save.create({
                data: { userId, postId: post.id }
            })

            return { success: true }
        } catch (error) {
            throw new HttpException('Internal Server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
