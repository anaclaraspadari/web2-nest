/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private usersService: UsersService, private jwtService: JwtService){}
    
    async signIn (email: string, pass: string): Promise<{ access_token: string }>{
        const user=await this.usersService.findByEmail(email)
        if(!user){
            throw new UnauthorizedException("Credenciais invalidas")
        }
        const isMatch=await bcrypt.compare(pass,user.password);
        if(!isMatch){
            throw new UnauthorizedException("Credenciais invalidas")
        }
        const payload = { sub: user.id, email: user.email, name: user.name, profile: user.profile };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
