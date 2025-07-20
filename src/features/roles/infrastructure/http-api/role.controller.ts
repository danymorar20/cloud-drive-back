import { JwtAuthGuard } from '@auth/infrastructure/http-api/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleUseCase } from '@roles/application/use-cases/create-role.use-case';
import { FindAllRolesUseCase } from '@roles/application/use-cases/find-all-roles.use-case';
import { FindRoleByIdUseCase } from '@roles/application/use-cases/find-role-by-id.use-case';
import { RoleResponseDto } from './dtos/responses/role-response.dto';
import { CreateRoleRequestDto } from './dtos/requests/role-request.dto';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
  ) {}

  @Get()
  async getAllRoles(): Promise<RoleResponseDto[]> {
    return await this.findAllRolesUseCase.execute();
  }

  @Post()
  async createRole(
    @Body() newRole: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return await this.createRoleUseCase.execute(newRole);
  }

  @Get(':id')
  async findRoleById(
    @Param('id', new ParseUUIDPipe()) roleId: number,
  ): Promise<RoleResponseDto | null> {
    return await this.findRoleByIdUseCase.execute(roleId);
  }
}
