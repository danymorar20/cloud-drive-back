import { Injectable } from "@nestjs/common";
import { UserRepository } from "@users/domain/repositories/user.repository";

@Injectable()
export class UpdateUserStatusUseCase {
  constructor(
    private readonly userRepo: UserRepository,
  ) {}

  async execute(userId: string, status: boolean): Promise<void> {
    return this.userRepo.updateStatus(userId, status);
  }
}