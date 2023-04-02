import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Get('main')
    main() {
        return { message: 'auth test main' }
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        
        return this.authService.signup()
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }

}