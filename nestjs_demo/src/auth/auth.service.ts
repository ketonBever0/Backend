import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {

    }

    signup() {
        return { message: 'Sign up' }
    }

    signin() {
        return { message: 'Sign in' }
    }

}