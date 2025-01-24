import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule { }