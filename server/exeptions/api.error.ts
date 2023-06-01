module.exports = class ApoError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message)

        this.status = status;
        this.errors = errors
    }

    static Unauthorized() {
        return new ApoError(401, "User not authorized")
    }

    static BadRequest(message, errors) {
        return new ApoError(400, message, errors)
    }
}