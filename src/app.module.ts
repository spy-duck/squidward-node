import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SquidNodeModule } from '@/modules/squid-node.module';
import { RedisModule } from '@/common/libs/redis/redis.module';
import { SupervisordModule } from '@/common/libs/supervisord/supervisord.module';

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
                port: 61002,
                user: 'squidward',
                password: 'UlJQmtqQ0NBVGVnQXdJQkFnSUhBWF',
            }),
        }),
        RedisModule.registerAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                database: 10,
                host: 'redis',
                port: 6380,
                password: config.get('REDIS_PASSWORD'),
            }),
        }),
        SquidNodeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
