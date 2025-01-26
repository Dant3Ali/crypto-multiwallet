import jwt from 'jsonwebtoken';
import AuthorizationError from "../errors/authorization.error";
import user, {IUser} from "../models/user";
import User from "../models/user";

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

export function addUser(email: string, password: string): any {
    const user = new User({ email, password });
    return user.save();
}

export function findUserByEmail(email: string): any {
    return User.findOne({ email });
}

export function comparePassword(user: IUser, password: string): Promise<boolean> {
    return user.comparePassword(password);
}
