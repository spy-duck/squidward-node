export interface TPostUsersRequest {
    data: {
        id: string;
        username: string;
        password: string;
    }[];
}