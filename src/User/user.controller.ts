import { CreateUserDTO } from './dto/CreateUser.dto';
import { GetUserDTO } from './dto/GetUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";

@Controller('/users')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post()
  async postUser(@Body() userData: CreateUserDTO) {
    const userCreated = await this.userService.createUser(userData)

    return { 
      user: new GetUserDTO(userCreated.id, userCreated.name, userCreated.password),
      message: 'User created with success!'
    };
  };

  @Get()
  async getUser () {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.getOne(id)
  }

  @Put('/:id')
  async updateUsers (@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    return { user: await this.userService.updateUser(id, newData), message: 'user updated with success!' };
  }

  @Delete('/:id')
  async deleteUsers (@Param('id') id: string) {
    return { user: await this.userService.deleteUser(id), message: 'user deleted with success!' };
  } 
}