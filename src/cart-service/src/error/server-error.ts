import { CustomError } from "./custom-error";

export default class ServerError extends CustomError {

    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(statusCode, message);
        this.statusCode = statusCode;
    }

    serialize(): { error: string; } {
        return { error: super.message };
    }   
}