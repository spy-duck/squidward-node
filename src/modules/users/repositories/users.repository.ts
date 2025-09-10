import { Injectable } from '@nestjs/common';
import { RedisService } from '@/common/libs/redis/redis.service';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(
        private readonly redisService: RedisService,
    ) {}
    
    async create(user: UserEntity): Promise<UserEntity> {
        await this.redisService.client.hSet(
            `user:${user.username}`,
            'password',
            user.password,
        );
        await this.redisService.client.hSet(
            `user:${user.username}`,
            'id',
            user.id,
        );
        return user;
    }
    
    async clear(): Promise<void> {
        let cursor = '0';
        let keysToDelete: string[] = [];
        
        do {
            const {
                cursor: nextCursor,
                keys,
            } = await this.redisService.client.scan(
                cursor,
                {
                    MATCH: 'user:*',
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
    
    async remove(username: string): Promise<void> {
        await this.redisService.client.del(
            `user:${username}`,
        );
    }
    
    async getByUsername(username: string): Promise<UserEntity | null> {
        const exist = await this.redisService.client.exists(
            `user:${ username }`,
        );
        
        if (!exist) {
            return null;
        }
        
        const user = await this.redisService.client.hGetAll(
            `user:${ username }`,
        );
        
        return new UserEntity(
            user.id,
            username,
            user.password,
        );
    }
}