import { loginDto } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { CreateUserDto } from '@/user/dto/createUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserEntity } from '@/user/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe)
    async createUser(@Body('user') createUserDTO: CreateUserDto){
        return await this.userService.createUser(createUserDTO);
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    async loginUser(@Body('user') loginUserDto: loginDto): Promise<UserEntity> {
        const user = await this.userService.loginUser(loginUserDto);
        return user;
    }
}