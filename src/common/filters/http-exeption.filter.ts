import { ArgumentsHost, ExceptionFilter, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "../services/prisma.service";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error';

        const errorMessage = typeof message === 'string' 
            ? message 
            : (message as any).message || JSON.stringify(message);

        const errorCode = (exception as any).errorCode || 'UNKNOWN_ERROR';

        // Guardar log en base de datos
        await this.prisma.logs.create({
            data: {
                statusCode: status,
                timestamp: new Date(),
                path: request.url,
                error: errorMessage,
                errorCode: errorCode,
                session_id: (request as any).user?.id ?? null,
            }
        }).catch(err => console.error('Error al guardar log en BD:', err)); 

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: errorMessage,
            errorCode: errorCode,
        });
    }
}