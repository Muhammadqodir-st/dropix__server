import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, } from '@nestjs/common';
import { SaveService } from './save.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { SaveDto } from './dto/save.dto';

@Controller('save')
export class SaveController {
    constructor(private readonly saveService: SaveService) { }

    @Get()
    findAll() {
        return this.saveService.findAll()
    }

    @UseGuards(AuthGuard)
    @Get("user")
    findById(@Req() req: Req__with__user) {
        return this.saveService.findById(req.user.id)
    }

    @UseGuards(AuthGuard)
    @Post('create')
    create(@Body() dto: SaveDto, @Req() req: Req__with__user) {
        return this.saveService.create(req.user.id, dto)
    }

}
