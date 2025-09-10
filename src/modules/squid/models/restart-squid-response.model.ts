export class RestartSquidResponseModel {
    success: boolean;
    error: null | string;
    constructor(success: boolean, error?: null | string) {
        this.success = success;
        this.error = error || null;
    }
}