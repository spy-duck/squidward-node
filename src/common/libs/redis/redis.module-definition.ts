import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RedisClientOptions } from '@redis/client';

export type TRedisModuleOptions = RedisClientOptions;

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<TRedisModuleOptions>().build();
