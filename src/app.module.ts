import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { DatabaseModule } from './config/database.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { MySQLConfig } from './config/database.config';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      load: [MySQLConfig],
    }),
    UsersModule,
    DatabaseModule,
    ServicesModule,
    AuthModule,
  ]
})
export class AppModule {}
