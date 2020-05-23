import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message:'Debe cumplir el regex >:0'})
    password:string
}