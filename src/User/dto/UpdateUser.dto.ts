import { IsNotEmpty, IsEmail, MinLength, IsOptional } from "class-validator";

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Email invalided!' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must be less than 6 characters' })
  @IsOptional()
  password: string;
}