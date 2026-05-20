import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm'
import { IUserResponse } from "./types/userResponse.interface";
import { sign, verify } from 'jsonwebtoken'
import { loginDto } from "./dto/loginUser.dto";
import { compare } from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
    async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)

        const userByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        })

        const userByName = await this.userRepository.findOne({
            where: {
                name: createUserDto.name
            }
        })

        if (userByName || userByEmail) {
            throw new HttpException('Email or Name is already set', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const savedUser = await this.userRepository.save(newUser);
        return this.generateUserResponse(savedUser)
    }

    async loginUser(loginUserDto: loginDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            },
        });

        if (!user) {
            throw new HttpException("Wrong credencials", HttpStatus.UNAUTHORIZED);   
        }

        const matchPassword = await compare(loginUserDto.password, user.password);
        
        if (!matchPassword) {
            throw new HttpException("Wrong credencials", HttpStatus.UNAUTHORIZED);   
        }
 
        delete user.password

        return user;
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id,
            }
        })

        if (!user) {
            throw new HttpException('if not found in user', HttpStatus.NOT_FOUND)
        }

        return user;
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
