import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;

  @IsEmail(undefined, { message: 'Email invalided!' })
  email: string;

  @MinLength(6, { message: 'Password must be less than 6 characters' })
  password: string;
}