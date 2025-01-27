import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "../user.service";

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;
  private readonly userService: UserService;

  async hashPassword (password: string): Promise < string > {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }


  async signIn(username: string, password: string) {
    // const user = await this.userService.getOne(username);
    const passwordMatch = await bcrypt.compare(username, password)
   
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials!');


    return passwordMatch
  
  }
}