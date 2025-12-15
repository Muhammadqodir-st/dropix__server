import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Req__with__user } from 'src/interfaces/getUser.interface';

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
        @Req() req: Req__with__user,
        @Body('name') name: string,
        @Body('bio') bio: string
    ) {
        return this.userService.updateOne(name, bio, file, req)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deletOne(@Param('id') id: string) {
        return this.userService.deleteOne(id)
    }
}
