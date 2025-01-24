import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { GetUserDTO } from "./dto/GetUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  async createUser (userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    const hashedPassword = await this.authService.hashPassword(userData.password)

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = hashedPassword;

    return this.userRepository.save(userEntity)
  }

  async getUsers () {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map((user) => new GetUserDTO(user.id, user.name, user.password));

    return usersList;
  }

  async updateUser (id: string, newData: UpdateUserDTO) {
    return await this.userRepository.update(id, newData);
  }

  async deleteUser (id: string) {
    return await this.userRepository.delete(id);
  }
}