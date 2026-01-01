import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { UpdateUser } from './dto/update.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

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
        @Body() dto: UpdateUser,
    ) {
        return this.userService.updateOne(dto, file, req)
    }

    @Delete(':id')
    deletOne(@Param('id') id: string) {
        return this.userService.deleteOne(id)
    }
}
