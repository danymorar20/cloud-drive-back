import { Injectable } from "@nestjs/common";
import { Role } from "@roles/domain/entities/role.entity";
import { RoleRepository } from "@roles/domain/repositories/role.repository";

@Injectable()
export class FindRoleByIdUseCase {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  async execute(roleId: number): Promise<Role | null> {
    return await this.roleRepository.getById(roleId);
  }
}
