import { Injectable } from "@nestjs/common";
import { Role } from "@roles/domain/entities/role.entity";
import { RoleRepository } from "@roles/domain/repositories/role.repository";

@Injectable()
export class FindAllRolesUseCase {
  constructor(
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(): Promise<Role[]> {
    return await this.roleRepository.getAll();
  }
}
