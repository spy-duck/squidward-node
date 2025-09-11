import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import express, { json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { ZodValidationPipe } from 'nestjs-zod';
import winston, { createLogger } from 'winston';
import { utilities as winstonModuleUtilities, WinstonModule } from 'nest-winston';
import { AppModule } from '@/app.module';
import { isDevelopment } from '@/common/utils/is-development';
import { INTERNAL_SERVER_PORT } from '@/contracts/constants';
import { InternalServerMiddleware } from '@/common/middleware/internal-server.middleware';

const logger = createLogger({
    transports: [ new winston.transports.Console() ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.align(),
        winstonModuleUtilities.format.nestLike('', {
            colors: true,
            prettyPrint: true,
            processId: false,
            appName: false,
        }),
    ),
    level: isDevelopment() ? 'debug' : 'info',
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            instance: logger,
        }),
    });
    app.use(json({ limit: '1000mb' }));

    app.use(compression());

    const config = app.get(ConfigService);

    app.use(helmet());

    if (isDevelopment()) {
        app.use(morgan('short'));
    }

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(Number(config.getOrThrow<string>('APP_PORT')));

    const httpAdapter = app.getHttpAdapter();
    const httpServer: any = httpAdapter.getInstance();

    const internalApp = express();
    internalApp.use(json({ limit: '1000mb' }));
    internalApp.use(InternalServerMiddleware(httpServer));

    const internalServer = internalApp.listen(INTERNAL_SERVER_PORT, '127.0.0.1');

    let internalServerClosed = false;

    const closeInternalServer = () => {
        if (internalServerClosed) return;
        internalServerClosed = true;
        internalServer.close(() => {
            logger.info('Shutting down...');
        });
    };

    app.enableShutdownHooks();

    process.on('SIGINT', closeInternalServer);
    process.on('SIGTERM', closeInternalServer);

    logger.info(`
====================================================
= Internal server started on http://127.0.0.1:${ INTERNAL_SERVER_PORT } =
====================================================
    `);
}

bootstrap();
