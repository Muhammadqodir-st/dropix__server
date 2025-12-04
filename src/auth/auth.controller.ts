import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    registerUser(@Body() dto: RegisterDto) {
        return this.authService.registerUser(dto)
    }

    @Post('login')
    loginUser(@Body() dto: LoginDto) {
        return this.authService.loginUser(dto)
    }

    @Get('verify')
    verifyUser(@Query("token") token: string) {
        return this.authService.verifyUser(token)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getUser(@Req() req: Req__with__user) {
        return this.authService.getUser(req)
    }
}
