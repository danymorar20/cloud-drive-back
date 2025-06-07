import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UserRepositoryImpl } from './infrastructure/persistence/typeorm/user.repository.impl';
import { UsersController } from './infrastructure/http-api/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';
import { UpdateUserStatusUseCase } from './application/use-cases/update-user-status.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  exports: [
    UserRepository,
    CreateUserUseCase,
    FindUserByEmailUseCase,
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    UpdateUserStatusUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
