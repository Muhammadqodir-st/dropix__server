import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { Req__with__user } from 'src/interfaces/getUser.interface';
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
            return await this.prisma.post.findMany()
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async findById(id: string) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id }
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

        const image = await this.aws.upload__post__image(file)

        try {
            const post = await this.prisma.post.create({
                data: {
                    title: data.title,
                    image: image,
                    autherId: userId
                }
            });

            return { post, success: true }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
