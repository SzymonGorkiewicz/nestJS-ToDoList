import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/entities/users/dto/create-user.dto';
import { User } from 'src/entities/users/entities/user.entity';
import { UsersService } from 'src/entities/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, 
    private userService:UsersService, 
    private jwtService: JwtService){}

    async singIn(username:string, pass:string):Promise<{access_token:string, username:string, name:string, id:number, email:string}>{
        const user = await this.userService.findOne(username);

        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException('Invalid credentials!');
        }

        const payload = {sub: user.id, username: user.username};

        return {access_token: await this.jwtService.signAsync(payload), username:user.username, name:user.name, id:user.id, email:user.email}
    }


    async register(createUserDto: CreateUserDto): Promise<User> {
        const checkIfUserExist = await this.userService.findOne(createUserDto.username);

        if (checkIfUserExist){
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = new User();
        user.username = createUserDto.username;
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = hashedPassword;

        return await this.userRepository.save(user);
      }

    validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret : process.env.JWT_SECRET_KEY
        });
    }
}
