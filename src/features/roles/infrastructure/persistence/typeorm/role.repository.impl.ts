import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleRepository } from "@roles/domain/repositories/role.repository";
import { RoleOrmEntity } from "./role.orm-entity";
import { Repository } from "typeorm";
import { Role } from "@roles/domain/entities/role.entity";

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleOrmEntity)
    private readonly roleRepository: Repository<RoleOrmEntity>,
  ) {}

  async create(role: Role): Promise<Role> {
    const roleSaved = await this.roleRepository.save(
      this.roleRepository.create({
        name: role.name,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        status: role.status,
      }),
    );

    return new Role(
      roleSaved.id,
      roleSaved.name,
      roleSaved.createdAt,
      roleSaved.updatedAt,
      roleSaved.status,
    );
  }

  async getById(roleId: number): Promise<Role | null> {
    return await this.roleRepository.findOneBy({ id: roleId });
  }

  async getAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
