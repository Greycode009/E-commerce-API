import AppError from "../utils/AppError.js"

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError("Access denied", 403);
        }
        next();
    }
}