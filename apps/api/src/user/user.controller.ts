import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    getMe(@Req() req: any) {
        return this.userService.findById(req.user.id);
    }

    @Patch('me')
    @UseGuards(AuthGuard)
    updateMe(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(req.user.id, updateUserDto);
    }
}
