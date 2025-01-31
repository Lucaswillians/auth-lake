import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { GetUserDTO } from "./dto/GetUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { Inject, Injectable, NotFoundException, UseGuards, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService, 
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

  async getOneJWTverify (name: string) {
    const username = await this.userRepository.findOne({ where: { name } })

    if (!username) throw new NotFoundException(`User ${name} not found`);

    return new GetUserDTO(username.id, username.name, username.password)
  }

  async getOne (id: string) {
    const userId = await this.userRepository.findOne({ where: { id } });

    if (!userId) throw new NotFoundException(`User with id ${id} not found`);

    return new GetUserDTO(userId.id, userId.name, userId.password)
   }

  async updateUser (id: string, newData: UpdateUserDTO) {
    return await this.userRepository.update(id, newData);
  }

  async deleteUser (id: string) {
    return await this.userRepository.delete(id);
  }
}