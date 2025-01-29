import { Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "../user.service";

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;
  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService;



  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async signIn(username: string, password: string) {
    // 1. Busca o usuário pelo nome de usuário
    const user = await this.userService.getOne(username);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    // 2. Compara a senha fornecida com a senha armazenada no banco de dados
    const passwordMatch = await this.comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    // 3. Retorna uma resposta de sucesso (você pode incluir um token aqui, se necessário)
    return { message: 'Login successful', user: { id: user.id, name: user.name } };
  }
}
