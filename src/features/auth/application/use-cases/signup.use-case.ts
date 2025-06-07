import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordHasherService } from '@hasher-service/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '@auth/application/dtos/signup.dto';
import { AuthResponseDto } from '@auth/application/dtos/auth-response.dto';
import { FindUserByEmailUseCase } from '@users/application/use-cases/find-user-by-email.use-case';
import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly passwordHasher: PasswordHasherService,
    private readonly jwtService: JwtService,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(dto: SignupDto): Promise<AuthResponseDto> {
    const exists = await this.findUserByEmailUseCase.execute(dto.email);
    if (exists) throw new BadRequestException('Email already registered');

    const hash = await this.passwordHasher.hash(dto.password);
    const user = await this.createUserUseCase.execute({
      email: dto.email,
      password: hash,
      status: true,
      name: dto.name,
      lastName: dto.lastName,
      cellphone: dto.cellphone,
    });

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}