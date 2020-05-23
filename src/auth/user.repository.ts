import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signup(authCredentialDTO:AuthCredentialDTO): Promise<User>{
        const {username, password} = authCredentialDTO;
        const salt = await bcrypt.genSalt();
        const encriptedPassword = await this.hashPassword(password, salt);
        const user = new User();
        user.username=username;
        user.password=encriptedPassword;
        user.salt=salt
         try{
            return await user.save()
         }catch(error){
            throw new ConflictException(`El username ${username} ya existe`);
         }
    }
    private hashPassword= async(password:string, salt:string) : Promise<string> =>{
        return bcrypt.hash(password, salt);
    }

    validatePassword = async(authCredentialDTO:AuthCredentialDTO) : Promise<string> =>{
        const {username, password} = authCredentialDTO;
        const user = await this.findOne({username});
        if(user && await user.validatePassword(password)){
            return user.username;
        }else{
            throw new UnauthorizedException("Invalid credentials")
        }
        
    }
}