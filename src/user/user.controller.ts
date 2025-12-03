import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { GetUser } from 'src/interfaces/getUser.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    updateOne(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: GetUser,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('bio') bio: string
    ) {
        return this.userService.updateOne(name, email, bio, file, req)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deletOne(@Param('id') id: string) {
        return this.userService.deleteOne(id)
    }
}
