import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { SignupUseCase } from '@auth/application/use-cases/signup.use-case';
import { LoginDto } from '@auth/infrastructure/http-api/controllers/dtos/login.dto';
import { SignupDto } from '@auth/infrastructure/http-api/controllers/dtos/signup.dto';
import { AuthResponseDto } from '@auth/infrastructure/http-api/controllers/dtos/auth-response.dto';
import { BasicAuthGuard } from '@auth/infrastructure/http-api/guards/basic-auth.guards';

@UseGuards(BasicAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<AuthResponseDto> {
    return this.signupUseCase.execute(dto);
  }
}
