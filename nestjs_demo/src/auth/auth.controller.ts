import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/all")
  getAll() {
    return this.authService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  @Post('/signup')
  signup(@Body() dto: RegDto) {
    return this.authService.signup(dto);
  }
}
