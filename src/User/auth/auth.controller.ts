import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../dto/CreateUser.dto";

@Controller('/auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  async signin(@Body() userData: CreateUserDTO) {
    return this.authService.signIn(userData.name, userData.password);
  }
}