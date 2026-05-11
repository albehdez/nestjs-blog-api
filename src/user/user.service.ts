import { UserEntity } from "@/user/user.entity";
import { CreateUserDto } from "@/user/dto/createUser.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
    async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        return await this.userRepository.save(newUser);
    }
}