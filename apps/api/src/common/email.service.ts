import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendResetPasswordEmail(email: string, token: string) {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    console.log(`
[MOCK EMAIL SERVICE]
To: ${email}
Subject: Reset Your Password

Click the link below to reset your password:
${resetLink}
`);
  }
}
