import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '@users/domain/repositories/user.repository';
import { User } from '@users/domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const ormEntity = this.ormRepo.create({
      id: user.id!,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      cellphone: user.cellphone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      status: user.status,
    });

    const saved = await this.ormRepo.save(ormEntity);
    return new User(
      saved.id,
      saved.name,
      saved.lastName,
      saved.email,
      saved.password,
      saved.cellphone,
      saved.createdAt,
      saved.updatedAt,
      saved.status,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.ormRepo.findOne({ where: { email } });
    if (!ormUser) return null;
    return new User(
      ormUser.id,
      ormUser.name,
      ormUser.lastName,
      ormUser.email,
      ormUser.password,
      ormUser.cellphone,
      ormUser.createdAt,
      ormUser.updatedAt,
      ormUser.status,
    );
  }

  async updateStatus(userId: string, status: boolean): Promise<void> {
    await this.ormRepo.update(
      userId,
      {
        status,
        updatedAt: new Date(),
      }
    );
  }
}
