import { IsEmail, IsString, Length, Matches } from "class-validator";

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(10, 10, { message: 'Cellphone must be exactly 10 digits long' })
  @Matches(/^[0-9]+$/, { message: 'Cellphone must contain only numbers' })
  cellphone: string;
}
