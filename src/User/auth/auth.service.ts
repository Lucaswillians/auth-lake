import { Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "../user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;
  
  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService;
  
  @Inject()
  private readonly jwtService: JwtService;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async signIn(username: string, password: string) {
    const user = await this.userService.getOneJWTverify(username);
    const passwordMatch = await this.comparePasswords(password, user.password);

    if (!user) throw new UnauthorizedException('User not found!');

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials!');

    const payload = { sub: user.id, username: user.name};

    return { message: 'Login successful', access_token: await this.jwtService.signAsync(payload) };
  }
}
