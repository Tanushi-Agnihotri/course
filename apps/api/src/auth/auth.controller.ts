import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      console.error('Error in registerUser controller:', error);
      throw error;
    }
  }

  @Post('signin')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginUserDto);

    // ------- COOKIE BANAA RHI HAI YAHAN -------
    res.cookie('session', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      message: 'Logged in',
      user: { id: result.id, email: result.name },
    };
  }

  @Post('signout')
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('session');
    return { message: 'Logged out' };
  }

  @Get('me')
  async getMe(@Req() req: any) {
    // Cookie parser should be enabled in main.ts for req.cookies to work
    // If not, we might need to parse 'cookie' header manually or ensure cookie-parser is installed
    // NestJS by default with Express adapter usually needs cookie-parser middleware
    const token = req.cookies?.['session'];

    if (!token) {
      return null; // Or throw UnauthorizedException, but returning null is often easier for frontend 'not logged in' check
    }

    try {
      return await this.authService.getUserProfile(token);
    } catch (e) {
      return null;
    }
  }
}