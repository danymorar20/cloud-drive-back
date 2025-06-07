import { IsBoolean, IsEmail, IsString, Length, Matches } from "class-validator";

export class CreateUserRequestDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Length(10, 10, { message: 'Cellphone must be exactly 10 digits long' })
  @Matches(/^[0-9]+$/, { message: 'Cellphone must contain only numbers' })
  cellphone: string;

  @IsBoolean()
  status: boolean;
}