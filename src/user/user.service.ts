import { UserEntity } from "./user.entity";
import { CreateUserDto } from "@/user/dto/createUser.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm'
import { IUserResponse } from "./types/userResponse.interface";
import { sign, verify } from 'jsonwebtoken'
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
    async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        const savedUser = await this.userRepository.save(newUser);
        return this.generateUserResponse(savedUser)
    }

    generateToken(user: UserEntity): string {
        const generatedToken = sign(
            {
                id: user.id,
                name: user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
        );
        
        return generatedToken;
    }

    generateUserResponse(user: UserEntity): IUserResponse {
        return {
            user: {
            ...user,
            token: this.generateToken(user),
            }
        }
    }
}
