import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    createUser(createUserDto) {
        console.log(createUserDto);
        
        return createUserDto;
    }
}