import { Controller, Get, Post, Body, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialDTO: AuthCredentialDTO) {
    return this.authService.signUp(authCredentialDTO);
  }
  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO): Promise<{accessToken:string}> {
    return this.authService.signIn(authCredentialDTO);
  }
  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user){
    return user;
  }
}
