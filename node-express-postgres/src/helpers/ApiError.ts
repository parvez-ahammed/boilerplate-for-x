export default class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string | undefined) {
        super(message);
        this.statusCode = statusCode;
    }
}
