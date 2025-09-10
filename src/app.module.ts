import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SquidNodeModule } from '@/modules/squid-node.module';
import { RedisModule } from '@/common/libs/redis/redis.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
      }),
      RedisModule.registerAsync({
          imports: [ ConfigModule ],
          inject: [ ConfigService ],
          useFactory: (config: ConfigService) => ({
              database: 10,
              host: 'redis',
              port: 6379,
              password: config.get('REDIS_PASSWORD'),
          }),
      }),
      SquidNodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
