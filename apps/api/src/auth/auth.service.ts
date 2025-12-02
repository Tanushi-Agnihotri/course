import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../common/email.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exists');
    return await this.userService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  async getUserProfile(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findById(payload.id);

      if (!user) throw new UnauthorizedException();

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async forgotPassword(email: string) {
    console.log('AuthService: Searching for user with email:', email);
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log('AuthService: User not found for email:', email);
      // Don't reveal if user exists
      return { message: 'If a user with this email exists, a password reset link has been sent.' };
    }

    console.log('AuthService: User found:', user.id);
    // Shorten token to 16 bytes (32 hex chars) to avoid terminal line wrapping issues
    const resetToken = crypto.randomBytes(16).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await this.userService.update(user.id, {
      resetToken,
      resetTokenExpiry,
    });

    console.log('AuthService: Sending email...');
    await this.emailService.sendResetPasswordEmail(email, resetToken);
    console.log('AuthService: Email sent.');

    return { message: 'If a user with this email exists, a password reset link has been sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    console.log(`AuthService: Reset Password request. Token: ${token} (Length: ${token.length})`);

    const user = await this.userService.findByResetToken(token);
    if (!user) {
      console.log('AuthService: User not found for token.');
      throw new BadRequestException('Invalid or expired token');
    }

    console.log('AuthService: User found:', user.email);
    console.log('AuthService: Token Expiry:', user.resetTokenExpiry);
    console.log('AuthService: Current Time:', new Date());

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      console.log('AuthService: Token expired.');
      throw new BadRequestException('Invalid or expired token');
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await this.userService.update(user.id, {
      password: hashPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    console.log('AuthService: Password updated successfully.');
    return { message: 'Password has been reset successfully.' };
  }
}
