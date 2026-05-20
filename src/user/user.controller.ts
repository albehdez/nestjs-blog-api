import { loginDto } from './dto/loginUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Req } from '@nestjs/common'
import { UserEntity } from './user.entity';
import type { AuthRequest } from './types/expressRequest.interface';
import { User } from './decorators/user.decorator';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
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

    @Get('user')
    async getCurrentUser(@User() user): Promise<IUserResponse> {
        console.log(user);
        return this.userService.generateUserResponse(user);
    } 
}