import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async signin(dto: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new ForbiddenException('Credentials incorrect!');
        }

        if (await argon.verify(user.password, dto.password)) {
            delete user.password;
            await this.prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    lastLogin: new Date()
                }
            })


            return {
                success: true,
                message: "Login successful!"
            }
        } else {
            throw new ForbiddenException('Credentials incorrect!');
        }

    }

    async signup(dto: RegDto) {

        const hash = await argon.hash(dto.password)
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    password: hash
                }
            })
            delete user.password;
            return {
                success: true,
                message: `Register successful. Welcome ${user.username}!`
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code == 'P2002') {
                if (error.meta.target[0] == 'email') {
                    throw new ForbiddenException(`E-mail address "${dto.email}" taken!`);
                }
                else if (error.meta.target[0] == 'username') {
                    throw new ForbiddenException(`Username "${dto.username}" taken!`);
                }
            }

        }

    }



}