import { HttpException, Injectable } from '@nestjs/common';
import { GetUser } from 'src/interfaces/getUser.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        try {
            const users = await this.prisma.user.findMany()

            return { users }
        } catch (error) {
            throw new HttpException('Interval Server error', 404)
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id },
            });

            if (!user) {
                throw new HttpException('User not found', 404)
            }

            return { user }
        } catch (error) {
            throw new HttpException('User not found', 404)
        }
    }

    async updateOne(name: string, email: string, bio: string, file: Express.Multer.File, req: GetUser) {

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
            throw new HttpException('Interval Server error', 404)
        }
    }
}
