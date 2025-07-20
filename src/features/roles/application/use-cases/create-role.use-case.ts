import { Injectable } from '@nestjs/common';
import { Role } from '@roles/domain/entities/role.entity';
import { RoleRepository } from '@roles/domain/repositories/role.repository';
import { CreateRoleDto } from '@roles/application/dtos/create-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(
      Role.create({
        name: roleDto.name,
        status: true,
      }),
    );
  }
}
