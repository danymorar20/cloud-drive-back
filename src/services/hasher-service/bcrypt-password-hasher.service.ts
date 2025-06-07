import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasherService } from './password-hasher.service';

@Injectable()
export class BcryptPasswordHasherService implements PasswordHasherService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}