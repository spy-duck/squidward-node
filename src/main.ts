import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import { json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { ZodValidationPipe } from 'nestjs-zod';
import winston, { createLogger } from 'winston';
import { utilities as winstonModuleUtilities, WinstonModule } from 'nest-winston';
import { AppModule } from '@/app.module';
import { isDevelopment } from '@/common/utils/is-development';

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
    
    app.enableShutdownHooks();
}

bootstrap();

var fl = {
    "nodeCertPem": "-----BEGIN CERTIFICATE-----\nMIIBmDCCAT+gAwIBAgIHAXV0hAUGKDAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgw\nQmtXLVMwMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDkx\nMDA2MDA1MFoXDTI4MDkxMDA2MDA1MFowOTE3MDUGA1UEAxMuU0hCQzFMZUU4ZkVE\nN1RjckhoQnFiZFo2dmpvM2FVaGZyd2twU2N0cEt1b25KVTBZMBMGByqGSM49AgEG\nCCqGSM49AwEHA0IABE2mhJ6yt5ro1priJpZ0kwN4ourjNB6Ym43o6mkTT+WNLpuR\nCUpCDTCqaiiZoVBpaXY+N2+dFtx36/E/Ob1S8/GjODA2MAwGA1UdEwEB/wQCMAAw\nDgYDVR0PAQH/BAQDAgWgMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMBMAoGCCqGSM49\nBAMCA0cAMEQCIGuOIMyruC7tJTzk776HenfCgqJhnQIj9ZyfM8EGJpLwAiBftXmt\nXlESANg3+HSA5ExrKvrOpNOzocXGihDv/zEqmQ==\n-----END CERTIFICATE-----",
    "nodeKeyPem": "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgJ3/fBG2svUrcqZ65\ns/iZOHBO3AsIHX1g/pCThIvVMmWhRANCAARNpoSesrea6Naa4iaWdJMDeKLq4zQe\nmJuN6OppE0/ljS6bkQlKQg0wqmoomaFQaWl2PjdvnRbcd+vxPzm9UvPx\n-----END PRIVATE KEY-----",
    "caCertPem": "-----BEGIN CERTIFICATE-----\nMIIBeDCCAR6gAwIBAgIBATAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgwQmtXLVMw\nMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDUwNjA4MzEw\nOFoXDTM1MDUwNjA4MzEwOFowMzExMC8GA1UEAwwoMEJrVy1TMDBzMmMtVnRnY2ZF\nLWpaUF9UMktDSzRiZXUwanVWcHhlNzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IA\nBFNG89j0CsnrXF/rRQRi+WAuGOIelNmyTyRbDT3UJXSOAzqOzJcTeHa2ZMHJJmn8\nWggJYBJOSHiUGCkbdFm1FYKjIzAhMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/\nBAQDAgKEMAoGCCqGSM49BAMCA0gAMEUCIEUWZGdKTy4N9EitR9AXoHs/a5jMEhJa\nGprWg1APvDa5AiEA6EShK6gsJheI8RLxVlyWBAZYzm17E5DeTneN/pIEu9o=\n-----END CERTIFICATE-----",
    "jwtPublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo0Dfk7MD894PJ5kxGISY\nfy8Q2MZik8shs+A/4+KhaUrKVjHbKp98Nkix/PqZdQ5BgzI6ZFmpsh1Ma73MreJV\nTIlXzhKzWgio6HcJpdNiheem8xfIdW/4DC+wZCxLgat3JjqXFtTeBibWNPQRrznn\niCPVfzIwhVYEvaajxnUJOtRlsvow2suSimvihxJyNTQlN0FdEzdN/kw4dtarVSDV\npicMEw3+iJv3JH4UAz+Fz4vmLzT9TniMOmC0J1cco9Z6SNAqYMKBQmD3Wx7VM8SV\nYTLfF6JaY8e7/qjkUpeBjvCGPMQW1oIVLb2O5Xfc/YYLuD/2MTfMz0sV6H1M66wt\nTwIDAQAB\n-----END PUBLIC KEY-----\n",
}
var de = {
    "nodeCertPem": "-----BEGIN CERTIFICATE-----\nMIIBgjCCASmgAwIBAgIHAXV0hAVXRDAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgw\nQmtXLVMwMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDkx\nMDA2MDA1NVoXDTI4MDkxMDA2MDA1NVowIzEhMB8GA1UEAxMYUkRrbWFjc01vZ05j\nUnpRWXRTYVQyeC1IMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE0wTRnUB/96ID\n2Ws8LCquJ0+EdiHrBOA9+elKpgg6luHCJMMq1SplprudNDcjvc9YcGET7fAoifaR\nahNJX3PxrqM4MDYwDAYDVR0TAQH/BAIwADAOBgNVHQ8BAf8EBAMCBaAwFgYDVR0l\nAQH/BAwwCgYIKwYBBQUHAwEwCgYIKoZIzj0EAwIDRwAwRAIgWWyyaj8hgoXDY/1B\nk8XROXczztUGiqIrFUNkvMqHZysCICZJc4rNqjxFDoiZDpR4rdlM6JOzWbMbNU27\n6S0P9mPW\n-----END CERTIFICATE-----",
    "nodeKeyPem": "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg20nr7bn2mb7ZcoHr\nHA+6tF7g6zafTSsq1NXW6oEfKaKhRANCAATTBNGdQH/3ogPZazwsKq4nT4R2IesE\n4D356UqmCDqW4cIkwyrVKmWmu500NyO9z1hwYRPt8CiJ9pFqE0lfc/Gu\n-----END PRIVATE KEY-----",
    "caCertPem": "-----BEGIN CERTIFICATE-----\nMIIBeDCCAR6gAwIBAgIBATAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgwQmtXLVMw\nMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDUwNjA4MzEw\nOFoXDTM1MDUwNjA4MzEwOFowMzExMC8GA1UEAwwoMEJrVy1TMDBzMmMtVnRnY2ZF\nLWpaUF9UMktDSzRiZXUwanVWcHhlNzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IA\nBFNG89j0CsnrXF/rRQRi+WAuGOIelNmyTyRbDT3UJXSOAzqOzJcTeHa2ZMHJJmn8\nWggJYBJOSHiUGCkbdFm1FYKjIzAhMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/\nBAQDAgKEMAoGCCqGSM49BAMCA0gAMEUCIEUWZGdKTy4N9EitR9AXoHs/a5jMEhJa\nGprWg1APvDa5AiEA6EShK6gsJheI8RLxVlyWBAZYzm17E5DeTneN/pIEu9o=\n-----END CERTIFICATE-----",
    "jwtPublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo0Dfk7MD894PJ5kxGISY\nfy8Q2MZik8shs+A/4+KhaUrKVjHbKp98Nkix/PqZdQ5BgzI6ZFmpsh1Ma73MreJV\nTIlXzhKzWgio6HcJpdNiheem8xfIdW/4DC+wZCxLgat3JjqXFtTeBibWNPQRrznn\niCPVfzIwhVYEvaajxnUJOtRlsvow2suSimvihxJyNTQlN0FdEzdN/kw4dtarVSDV\npicMEw3+iJv3JH4UAz+Fz4vmLzT9TniMOmC0J1cco9Z6SNAqYMKBQmD3Wx7VM8SV\nYTLfF6JaY8e7/qjkUpeBjvCGPMQW1oIVLb2O5Xfc/YYLuD/2MTfMz0sV6H1M66wt\nTwIDAQAB\n-----END PUBLIC KEY-----\n",
}

console.log('caCertPem', fl.caCertPem == de.caCertPem)
console.log('nodeCertPem', fl.nodeCertPem == de.nodeCertPem)
console.log('nodeKeyPem', fl.nodeKeyPem == de.nodeKeyPem)
console.log('jwtPublicKey', fl.jwtPublicKey == de.jwtPublicKey)