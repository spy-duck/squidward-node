import { Injectable } from '@nestjs/common';
import { RedisService } from '@/common/libs/redis/redis.service';
import { UserEntity } from '@/modules/users/entities/user.entity';


enum REDIS_KEYS {
    USERNAME = 'username',
    UUID = 'uuid',
}

@Injectable()
export class UsersRepository {
    constructor(
        private readonly redisService: RedisService,
    ) {}
    
    async create(user: UserEntity): Promise<UserEntity> {
        await this.redisService.client.hSet(
            `${REDIS_KEYS.USERNAME}:${user.username}`,
            'password',
            user.password,
        );
        
        await this.redisService.client.hSet(
            `${REDIS_KEYS.USERNAME}:${user.username}`,
            'id',
            user.uuid,
        );
        
        await this.redisService.client.hSet(
            `${REDIS_KEYS.UUID}:${user.uuid}`,
            'username',
            user.username,
        );
        
        return user;
    }
    
    async clear(): Promise<void> {
        await this.removeKeys(REDIS_KEYS.USERNAME);
        await this.removeKeys(REDIS_KEYS.UUID);
    }
    
    private async removeKeys(key: REDIS_KEYS): Promise<void> {
        let cursor = '0';
        let keysToDelete: string[] = [];
        
        do {
            const {
                cursor: nextCursor,
                keys,
            } = await this.redisService.client.scan(
                cursor,
                {
                    MATCH: `${key}:*`,
                    COUNT: 100,
                },
            );
            keysToDelete = keysToDelete.concat(keys);
            cursor = nextCursor;
        } while (cursor !== '0');
        
        if (keysToDelete.length > 0) {
            await this.redisService.client.del(keysToDelete);
        }
    }
   
    async remove(userUuid: string): Promise<void> {
        const user = await this.getByUuid(userUuid);
        if (!user) {
            return;
        }
        await this.redisService.client.del(
            `${REDIS_KEYS.UUID}:${user.uuid}`,
        );
        await this.redisService.client.del(
            `${REDIS_KEYS.USERNAME}:${user.username}`,
        );
    }
    
    async getByUsername(username: string): Promise<UserEntity | null> {
        const exist = await this.redisService.client.exists(
            `${REDIS_KEYS.USERNAME}:${ username }`,
        );
        
        if (!exist) {
            return null;
        }
        
        const user = await this.redisService.client.hGetAll(
            `${REDIS_KEYS.USERNAME}:${ username }`,
        );
        
        return new UserEntity(
            user.uuid,
            username,
            user.password,
        );
    }
    
    async getByUuid(userUuid: string): Promise<UserEntity | null> {
        const userByUuid = await this.redisService.client.hGetAll(
            `${REDIS_KEYS.UUID}:${userUuid}`,
        )
        
        if (!userByUuid) {
            return null;
        }
        
        const exist = await this.redisService.client.exists(
            `${REDIS_KEYS.USERNAME}:${ userByUuid.username }`,
        );
        
        if (!exist) {
            return null;
        }
        
        const user = await this.redisService.client.hGetAll(
            `${REDIS_KEYS.USERNAME}:${ userByUuid.username }`,
        );
        
        return new UserEntity(
            user.uuid,
            userByUuid.username,
            user.password,
        );
    }
}