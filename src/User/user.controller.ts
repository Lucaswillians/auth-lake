import { CreateUserDTO } from './dto/CreateUser.dto';
import { GetUserDTO } from './dto/GetUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";

@Controller('/users')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post()
  async postUser(@Body() userData: CreateUserDTO) {
    const userCreated = await this.userService.createUser(userData)

    return { 
      user: new GetUserDTO(userCreated.id, userCreated.name),
      message: 'User created with success!'
    };
  };

  @Get()
  async getUser () {
    return await this.userService.getUsers();
  }

  @Put('/:id')
  async updateUsers (@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    return { user: await this.userService.updateUser(id, newData), message: 'user updated with success!' };
  }

  

}