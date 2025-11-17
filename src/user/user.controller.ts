import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

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
    @Delete(':id')
    deletOne(@Param('id') id: string) {
        return this.userService.deleteOne(id)
    }
}
