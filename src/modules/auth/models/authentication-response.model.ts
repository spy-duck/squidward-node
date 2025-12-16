export class AuthenticationResponseModel {
    success: boolean;
    error: null | string;
    userUuid: string | null;
    
    constructor(success: boolean, error?: null | string, userUuid?: null | string) {
        this.success = success;
        this.error = error || null;
        this.userUuid = userUuid || null;
    }
}