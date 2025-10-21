export class UserNotFoundError extends Error {
    constructor() {
        super("User or password is incorrect.");
        this.name = "UserNotFoundError";
    }
}
