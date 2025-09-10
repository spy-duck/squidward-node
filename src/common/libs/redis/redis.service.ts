import { createClient, RedisClientType } from 'redis';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './redis.module-definition';

@Injectable()
export class RedisService {
    private readonly _client: RedisClientType;

    private readonly _logger = new Logger('RedisService');

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private options: Record<string, any>,
    ) {
        this._client = createClient({
            url: `redis://${options.host}:${options.port}`,
            database: options.database,
            username: options.username,
            password: options.password,
        });
        this._client.connect()
            .then(() => {
                this._logger.log('REDIS CONNECTED');
            }).catch((error) => {
                this._logger.error('REDIS CONNECTION ERROR');
                this._logger.error(error);
                return Promise.reject(error);
            });
    }

    get client(): RedisClientType {
        return this._client;
    }
}
