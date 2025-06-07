import { User } from "@users/domain/entities/user.entity";

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract updateStatus(userId: string, status: boolean): Promise<void>;
  //abstract getAll(): Promise<User[] | null>;
}
