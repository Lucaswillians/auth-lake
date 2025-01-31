import { Inject, Injectable, LoggerService, UnauthorizedException, forwardRef } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "../user.service";
import { JwtService } from "@nestjs/jwt";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from 'winston';  // Importe o tipo do Winston

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;

  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;  // Tipar explicitamente como Logger do Winston

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async signIn(username: string, password: string) {
    this.logger.warn(`Login try to user: ${username}`);

    const user = await this.userService.getOneJWTverify(username);

    if (!user) {
      this.logger.warn(`User not found -> catched by log: ${username}`);
      throw new UnauthorizedException('User not found!');
    }

    const passwordMatch = await this.comparePasswords(password, user.password);

    if (!passwordMatch) {
      this.logger.warn(`Password incorrect -> catched by log: ${username}`);
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload = { sub: user.id, username: user.name };

    this.logger.info(`Login successful -> catched by log: ${username}`);

    return { message: 'Login successful', access_token: await this.jwtService.signAsync(payload) };
  }
}
