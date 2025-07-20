import { Role } from "../entities/role.entity";

export abstract class RoleRepository {
  abstract create(role: Role): Promise<Role>;
  abstract getById(roleId: number): Promise<Role | null>;
  abstract getAll(): Promise<Role[]>;
}