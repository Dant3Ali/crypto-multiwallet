import jwt from 'jsonwebtoken';
import AuthorizationError from "../errors/authorization.error";
import user from "../models/user";

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    try {
        const jwtPayload = jwt.verify(token, SECRET_KEY, {ignoreExpiration: true});
        console.log(jwtPayload);
        return jwtPayload;
    } catch (err) {
        throw new AuthorizationError('Invalid token');
    }
}

export function findUserByEmail(email: string): any {
    return user.findOne({ email });
}
