import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User } from "src/modules/auth/entities/user.entity";
import { CreateUserDto } from "src/modules/auth/dto/user/create_user.dto";
import { UpdateUserDto } from "src/modules/auth/dto/user/update_user.dto";


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}
    private users: User[] = [];

    public async getUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }

    public async insertUser(user: CreateUserDto): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: user,
        });
        return newUser;
    }

    public async updateUser(id: number, userUpdated: UpdateUserDto): Promise<User>{
        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: userUpdated
        });
        return user;
    }

    public async deleteUser(id: number): Promise<boolean> {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        return !!user;
    }
}