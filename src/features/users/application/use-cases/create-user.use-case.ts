import { Injectable } from '@nestjs/common';
import { UserRepository } from '@users/domain/repositories/user.repository';
import { CreateUserDto } from '@users/application/dtos/create-user.dto';
import { User } from '@users/domain/entities/user.entity';
import { PasswordHasherService } from '@hasher-service/password-hasher.service';
import { IdGeneratorService } from '@id-generator/id-generator.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly idGenerator: IdGeneratorService,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  async execute(dto: CreateUserDto): Promise<Omit<User, "password">> {
    const user = User.create({
      ...dto,
      id: this.idGenerator.generate(), // Nestjs will generate uuid
      password: await this.passwordHasherService.hash(dto.password), // Protect the passwords
      createdAt: new Date(),
    });

    await this.userRepo.save(user);
    
    // Never return the password
    return {
      id: user.id!,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      cellphone: user.cellphone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      status: user.status,
    };
  }
}
