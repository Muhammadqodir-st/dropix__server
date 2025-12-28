import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AwsService } from 'src/common/aws/aws.service';
import { Req__with__user } from 'src/interfaces/getUser.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private aws: AwsService
    ) { }

    async findAll() {
        try {
            const users = await this.prisma.user.findMany()

            return { users }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id },
                include: {
                    posts: {
                        include: { auther: true, likes: true, comments: true, saves: true }
                    }
                }
            });

            if (!user) {
                throw new HttpException('User not found', 404)
            }

            return { user }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOne(name: string, bio: string, file: Express.Multer.File, req: Req__with__user) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: req.user.id }
            })

            if (!user) {
                throw new HttpException('User not found', 404)
            }

            if (!name) {
                throw new HttpException('Update user field', 400)
            }

            if (!file) {
                throw new HttpException("File not provided", 400)
            }

            const avatar = await this.aws.update__profile__image(file)

            const update = await this.prisma.user.update({
                where: { id: user.id },
                data: { name, bio, avatar }
            })

            return { success: true, user: update }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteOne(id: string) {
        try {
            const user = await this.prisma.user.delete({
                where: { id: id }
            });


            if (!user) {
                throw new HttpException('User not found', 404)
            }

            return { user, message: "User deleted", success: true }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
