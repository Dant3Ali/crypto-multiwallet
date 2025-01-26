class AuthorizationError extends Error {
    statusCode: number;

    constructor(message: string = 'Authorization failed', statusCode: number = 401) {
        super(message);
        this.name = 'AuthorizationError';
        this.statusCode = statusCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthorizationError);
        }
    }
}

export default AuthorizationError;
