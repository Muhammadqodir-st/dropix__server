import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly aws: AwsService,
        private readonly prisma: PrismaService
    ) { }

    async findAll() {
        try {
            return await this.prisma.post.findMany({
                include: { auther: true }
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async findById(id: string) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id },
                include: { auther: true }
            });

            if (!post) {
                throw new HttpException("Post not found!", 404)
            };

            return { post }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async createPost(file: Express.Multer.File, userId, data: CreatePostDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new HttpException("User not found!", 404)
        }

        if (!file) {
            throw new HttpException("File not provided", 400)
        }

        const image = await this.aws.upload__post__image(file)

        try {
            const post = await this.prisma.post.create({
                data: {
                    title: data.title,
                    image: image,
                    autherId: userId
                }
            });

            return { post, message: "Post created", success: true }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async update_post() { }

    async deleteById(id: string, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            throw new HttpException("Post not found!", 404)
        }

        if (post.autherId !== userId) {
            throw new HttpException("You are not creator of this post", 400)
        }

        try {
            const deleted__post = await this.prisma.post.delete({
                where: { id: post.id }
            });

            return { message: "Deleted post", success: true }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async deleteAll() {
        try {
            await this.prisma.post.deleteMany({})
            return "Deleted successfully"
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
