import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/entities/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    signIn(@Body() signInForm: Record<string,any>){
        return this.authService.singIn(signInForm.username, signInForm.password)
    }

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    register(@Body() userForm: CreateUserDto){
        return this.authService.register(userForm)
    }
    

}
