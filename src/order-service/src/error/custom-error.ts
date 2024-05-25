export abstract class CustomError extends Error {
    
    
    abstract statusCode: number;    

    constructor(statusCode: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serialize(): { error: string };
}