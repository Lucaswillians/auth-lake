import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { GetUserDTO } from "./dto/GetUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser (userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    return this.userRepository.save(userEntity)
  }

  async getUsers () {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map((user) => new GetUserDTO(user.id, user.name));

    return usersList;
  }

  async updateUser (id: string, newData: UpdateUserDTO) {
    return await this.userRepository.update(id, newData);
  }

  async deleteUser (id: string) {
    return await this.userRepository.delete(id);
  }
}