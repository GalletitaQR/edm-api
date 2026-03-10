import { Controller, Get, HttpStatus, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly jwtSvc: JwtService
  ) {}

  // POST /register 200
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica las credenciales y genera un JWT' })
  public async logIn(@Body() auth: AuthDto): Promise <string> {
    const { username, password } = auth;
    const jwt = this.jwtSvc.signAsync(auth, { secret: process.env.JWT_SECRET, expiresIn: '60s' });
    return this.authSvc.logIn();
  }

  @Get("me")
  @ApiOperation({ summary: 'Extrae el ID del usuario desde el token y busca la información' })
  public async getProfile() {
    // return this.authSvc.getProfile();
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Genera un nuevo JWT usando el refresh token' })
  public async refreshToken() {
    // return this.authSvc.refreshToken();
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Invalida el refresh token para cerrar sesión' })
  public async logOut() {
    // return this.authSvc.logOut();
  }
}

