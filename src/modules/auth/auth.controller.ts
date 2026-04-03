import { Controller, Get, HttpStatus, Post, HttpCode, Body, UnauthorizedException, UseGuards, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth/auth.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RefreshGuard } from 'src/common/guards/refresh.guard';
import { AppException } from 'src/common/exeptions/app.exeption';
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService
  ) { }

  // POST /register 200
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica las credenciales y genera un JWT' })
  public async logIn(@Body() auth: AuthDto): Promise<any> {
    const { username, password } = auth;

    const user = await this.authSvc.getUserByUsername(username);
    if (!user)
      throw new UnauthorizedException('Credenciales inválidas');

    if (await this.utilSvc.checkPassword(password, user.password!)) {

      const { password, ...payload } = user;

      //FIXME: Generar refresh token por 7d
      const refresh = await this.utilSvc.generateJwt(payload, '5m');
      const hashRT = await this.utilSvc.hash(refresh);
      await this.authSvc.updateHash(user.id, hashRT);

      payload.hash = hashRT;
      const jwt = await this.utilSvc.generateJwt(payload, '30s');

      return { access_token: jwt, refresh_token: hashRT };

    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  @ApiOperation({ summary: 'Extrae el ID del usuario desde el token y busca la información' })
  @Get("me")
  @UseGuards(AuthGuard)
  public async getProfile(@Req() request: any){
    const userId = request['user'];
    return userId;
  }


  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @ApiOperation({ summary: 'Recibe un "Refresh Token", valida que no haya expirado y entrega un nuevo  "Access Token "' })
  public async refreshToken(@Req() request: any) {
    //Tener el usuario en sesión
    const userSession = request['user'];
    const user = await this.authSvc.getUserById(userSession.id);
    if(!user || !user.hash) throw new AppException('Acceso denegado no usuario en sesión', HttpStatus.FORBIDDEN, '0');
    //Comparar le token recibido con el hash guardado en la base de datos
    if( userSession.hash != user.hash) throw new AppException('Acceso denegado hashes no iguales', HttpStatus.FORBIDDEN, '0');
    
    
    //Si es válido, generar un nuevo JWT de acceso
    const { password, ...payload } = user;

    // El nuevo Refresh Token
    const newRefreshToken = await this.utilSvc.generateJwt(payload, '5m');
    const newHashRT = await this.utilSvc.hash(newRefreshToken);
    await this.authSvc.updateHash(user.id, newHashRT);
    // El nuevo Access Token
    payload['hash'] = newHashRT;
    const newAccessToken = await this.utilSvc.generateJwt(payload, '1m');


    return { 
        access_token: newAccessToken, 
        refresh_token: newRefreshToken 
    };
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Invalida los tokens en el lado del servidor y limpia las cookies' })
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash(session.id, null);
     return user;  
  }

}