import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findUser(username);
    const password = await encodePassword(pass);
    if (user?.password == password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email,roles:user.role};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}