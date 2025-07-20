import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '@auth/application/dtos/signup.dto';
import { AuthResponseDto } from '@auth/application/dtos/auth-response.dto';
import { FindUserByEmailUseCase } from '@users/application/use-cases/find-user-by-email.use-case';
import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async execute(newUserDto: SignupDto): Promise<AuthResponseDto> {
    const exists = await this.findUserByEmailUseCase.execute(newUserDto.email);
    if (exists) throw new BadRequestException('Email already registered');

    const user = await this.createUserUseCase.execute({
      ...newUserDto,
      status: true,
    });

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
