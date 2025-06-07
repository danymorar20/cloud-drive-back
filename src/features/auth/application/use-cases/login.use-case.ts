import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordHasherService } from '@hasher-service/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@auth/application/dtos/login.dto';
import { AuthResponseDto } from '@auth/application/dtos/auth-response.dto';
import { FindUserByEmailUseCase } from '@users/application/use-cases/find-user-by-email.use-case';
import { UserAuth } from '@auth/domain/entities/user-auth.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly passwordHasher: PasswordHasherService,
    private readonly jwtService: JwtService,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const user: UserAuth | null = await this.findUserByEmailUseCase.execute(dto.email);
    if (!user || !user.status) throw new UnauthorizedException('Invalid credentials');
    const valid = await this.passwordHasher.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}