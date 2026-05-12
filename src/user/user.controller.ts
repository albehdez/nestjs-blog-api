import { CreateUserDto } from '@/user/dto/createUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post } from '@nestjs/common'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body('user') createUserDTO: CreateUserDto){
        return await this.userService.createUser(createUserDTO);
    }
}