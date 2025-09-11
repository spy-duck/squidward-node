export class ConfigSquidResponseModel {
    success: boolean;
    error: null | string;
    constructor(success: boolean, error?: null | string) {
        this.success = success;
        this.error = error || null;
    }
}