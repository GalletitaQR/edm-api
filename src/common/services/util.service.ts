import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";

@Injectable()
export class UtilService {
    constructor(private readonly jwtSvc: JwtService){}

    public async hash(text: string): Promise<string> {
        return await bcrypt.hash(text, 10);
    }

    public async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async generateJwt(payload: any, expiresIn: any = '1h'): Promise<string> {
        const token = await this.jwtSvc.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: expiresIn });
        return token;
    }

    public async getPayload(jwt: string, options?: JwtVerifyOptions): Promise<any>{
        return await this.jwtSvc.verifyAsync(jwt, { secret: process.env.JWT_SECRET, ...options });
    }
}