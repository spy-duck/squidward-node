import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SquidNodeModule } from '@/modules/squid-node.module';
import { RedisModule } from '@/common/libs/redis/redis.module';
import { SupervisordModule } from '@/common/libs/supervisord/supervisord.module';
import { JwtModule } from '@nestjs/jwt';
import { parseNodePayloadFromConfigService } from '@/common/utils/decode-node-payload';
import { JwtStrategy } from '@/common/guards/jwt/jwt-token.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        SupervisordModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => ({
                host: 'localhost',
                port: 61112,
                user: 'squidward',
                password: 'UlJQmtqQ0NBVGVnQXdJQkFnSUhBWF',
            }),
        }),
        RedisModule.registerAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => {
                const port = config.get('REDIS_PORT')
                    ? +config.get('REDIS_PORT')
                    : 6379;
                
                return ({
                    database: +config.getOrThrow('REDIS_DB'),
                    host: 'localhost',
                    port,
                    password: config.getOrThrow('REDIS_PASSWORD'),
                })
            },
        }),
        JwtModule.registerAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService) => {
                const certPayload = parseNodePayloadFromConfigService(
                    configService.getOrThrow<string>('SSL_CERT'),
                );
                return {
                    secret: certPayload.jwtPublicKey,
                    algorithms: [ 'RS256' ],
                };
            },
        }),
        SquidNodeModule,
    ],
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule {}
