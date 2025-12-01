export class UserEntity {
    public readonly uuid: string;
    public readonly username: string;
    public readonly password: string;
    public readonly expireAt: Date;
    
    constructor(entity: UserEntity) {
        Object.assign(this, entity);
        return this;
    }
}