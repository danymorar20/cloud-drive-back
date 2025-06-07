import { UserAuth } from '../entities/user-auth.entity';
//TO CHECK
export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<UserAuth | null>;
  abstract create(user: Partial<UserAuth>): Promise<UserAuth>;
}