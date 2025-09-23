export class UserEntity {
    constructor(
        public uuid: string,
        public username: string,
        public password: string,
    ) {}
}