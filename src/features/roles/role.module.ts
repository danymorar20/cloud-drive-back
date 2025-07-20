import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleOrmEntity } from './infrastructure/persistence/typeorm/role.orm-entity';
import { RoleRepository } from './domain/repositories/role.repository';
import { RoleController } from './infrastructure/http-api/role.controller';
import { CreateRoleUseCase } from './application/use-cases/create-role.use-case';
import { FindAllRolesUseCase } from './application/use-cases/find-all-roles.use-case';
import { FindRoleByIdUseCase } from './application/use-cases/find-role-by-id.use-case';
import { RoleRepositoryImpl } from './infrastructure/persistence/typeorm/role.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([RoleOrmEntity])],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    FindAllRolesUseCase,
    FindRoleByIdUseCase,
    {
      provide: RoleRepository,
      useClass: RoleRepositoryImpl,
    },
  ],
})
export class RoleModule {}
