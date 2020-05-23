import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
         @InjectRepository(UserRepository)
         private userRepository:UserRepository,
         private jwtService: JwtService,
    ){}

    signUp = async (authCredentialDTO:AuthCredentialDTO) =>{
        const created = await this.userRepository.signup(authCredentialDTO);
        if(created) return {msg:"creado con exito"}
    }

    signIn = async(authCredentialDTO:AuthCredentialDTO): Promise<{accessToken:string}> =>{
        const username= await this.userRepository.validatePassword(authCredentialDTO);

        const payload : JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken}
    }
}
