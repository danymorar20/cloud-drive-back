import { Module, Global } from '@nestjs/common';
import { IdGeneratorService } from './id-generator/id-generator.service';
import { UuidGeneratorService } from './id-generator/uuid-generator.service';
import { PasswordHasherService } from './hasher-service/password-hasher.service';
import { BcryptPasswordHasherService } from './hasher-service/bcrypt-password-hasher.service';

@Global()
@Module({
  providers: [
    {
      provide: IdGeneratorService,
      useClass: UuidGeneratorService,
    },
    {
      provide: PasswordHasherService,
      useClass: BcryptPasswordHasherService
    },
  ],
  exports: [
    IdGeneratorService,
    PasswordHasherService
  ],
})
export class ServicesModule {}
