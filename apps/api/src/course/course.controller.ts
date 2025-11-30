import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Prisma } from '../../generated/prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/user.enum';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    create(@Body() createCourseDto: Prisma.CourseCreateInput) {
        return this.courseService.create(createCourseDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.courseService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    update(
        @Param('id') id: string,
        @Body() updateCourseDto: Prisma.CourseUpdateInput,
    ) {
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    remove(@Param('id') id: string) {
        return this.courseService.remove(id);
    }
}
