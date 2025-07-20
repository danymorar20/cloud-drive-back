import { IsString } from "class-validator";

export class CreateRoleRequestDto {
  @IsString()
  name: string;
}
