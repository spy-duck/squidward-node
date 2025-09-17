export interface TPostUsersRequest {
    data: {
        uuid: string;
        username: string;
        password: string;
    }[];
}