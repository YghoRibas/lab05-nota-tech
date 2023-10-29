export class BaseError extends Error {
    public statusCode: number
    public error: string
    constructor(message: string, statusCode: number, error: string) {
        super(message)
        this.statusCode = statusCode
        this.error = error
    }

}

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(message, 500, "INTERNAL_SERVER_ERROR")
    }
}

export const errorParser = (err: Error) => ({
    name: err.name,
    msg: err.message,
});