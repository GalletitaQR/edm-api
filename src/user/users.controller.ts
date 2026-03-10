import { UserService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, HttpCode } from '@nestjs/common';
import { UtilService } from 'src/common/services/util.service';


@ApiTags()
@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly utilService: UtilService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Lista de Usuarios' })
    public async fetchUsers(): Promise<any[]> {
        return this.userService.getUsers();
    }

    @Get(":id")
    public async getUserById(@Param("id", ParseIntPipe) id: number): Promise<any> {
        var user = await this.userService.getUserById(id);
        if (user) return user;
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    public async insertUser(@Body() user: any): Promise<any> {
        const userByUsername = await this.userService.getUserByUsername(user.username);
        if (userByUsername) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        const encryptedPassword = await this.utilService.hashPassword(user.password);
        user.password = encryptedPassword;
        return await this.userService.insertUser(user);
    }

    @Put(":id")
    public async updateUser(@Param("id", ParseIntPipe) id: number, @Body()user: any): Promise<any>{      
        return await this.userService.updateUser(id, user);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    public async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
        try {
            return await this.userService.deleteUser(id);
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}
