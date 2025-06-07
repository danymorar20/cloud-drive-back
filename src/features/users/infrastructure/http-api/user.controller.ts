import { Controller, Post, Body, Param, Patch, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';
import { UserResponseDto } from './dtos/user-response.dto';
import { UpdateUserStatusUseCase } from '@users/application/use-cases/update-user-status.use-case';
import { UpdateUserStatusDto } from './dtos/update-user-status.dto';
import { JwtAuthGuard } from '@auth/infrastructure/http-api/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserStatusUseCase: UpdateUserStatusUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(dto);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUserStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserStatusDto,
  ): Promise<void> {
    await this.updateUserStatusUseCase.execute(id, body.status);
  }
}
