import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegDto } from "./dto";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signin')
    signin(@Body() dto: LoginDto) {

        return this.authService.signin(dto);
    }

    @Post('/signup')
    signup(@Body() dto: RegDto) {


        return this.authService.signup(dto);
    }

}