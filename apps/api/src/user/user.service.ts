import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcryptjs';
import { users } from '../../generated/prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<users> {
    const { password, role, ...user } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      return await this.prisma.users.create({
        data: {
          password: hashPassword,
          role: Role.User,
          ...user,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isValidMatch = await bcrypt.compare(password, user.password);
    if (!isValidMatch)
      throw new UnauthorizedException('Invalid email or password');

    // Token Generation
    const payload = {
      id: user.id,
      role: Role.User,
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      id: user.id,
      name: user.name,
      token,
    };
  }
}
