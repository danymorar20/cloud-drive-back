import { Injectable } from "@nestjs/common";
import { User } from "@users/domain/entities/user.entity";
import { UserRepository } from "@users/domain/repositories/user.repository";

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    private readonly userRepo: UserRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
}
