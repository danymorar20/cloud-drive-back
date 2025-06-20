import { Controller, Post, Body, UseGuards, Res, HttpCode } from '@nestjs/common';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { SignupUseCase } from '@auth/application/use-cases/signup.use-case';
import { LoginDto } from '@auth/infrastructure/http-api/controllers/dtos/login.dto';
import { SignupDto } from '@auth/infrastructure/http-api/controllers/dtos/signup.dto';
import { BasicAuthGuard } from '@auth/infrastructure/http-api/guards/basic-auth.guards';
import { CookieOptions, Response } from 'express';
import { AuthResponseDto } from './dtos/auth-response.dto';

@UseGuards(BasicAuthGuard)
@Controller('auth')
export class AuthController {
  private readonly cookieOptions: CookieOptions;

  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {
    const {
      ENV,
      COOKIE_MAX_AGE
    } = process.env;

    const COOKIE_SAME_SITE = (process.env.COOKIE_SAME_SITE as
      | 'lax'
      | 'strict'
      | 'none') ?? 'lax';

    this.cookieOptions = {
      httpOnly: true,
      secure: ENV === 'PROD',
      sameSite: COOKIE_SAME_SITE,
      maxAge: Number(COOKIE_MAX_AGE),
      path: '/',
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    const { accessToken } = await this.loginUseCase.execute(dto);
    res.cookie('access_token', accessToken, this.cookieOptions);
    return { message: 'Login successful' };
  }

  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    const { accessToken } = await this.signupUseCase.execute(dto);
    res.cookie('access_token', accessToken, this.cookieOptions);
    return { message: 'Signup successful' };
  }
}
