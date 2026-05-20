import { AuthRequest } from "../types/expressRequest.interface";
import { UserService } from "../user.service";
import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(req: AuthRequest, res: Request, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null;
            return next();  
        }

        const token = req.headers.authorization?.split(' ')[1];

        try{
            const decode = verify(token, process.env.JWT_SECRET)
            const user = await this.userService.findById(decode.id);
            req.user = user;
            next();
        }catch (err) { 
            req.user = null;
            next();
        } 
        
    }
}