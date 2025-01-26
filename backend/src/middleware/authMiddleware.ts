import {verifyToken} from '../services/authService';
import * as koa from 'koa';
import AuthorizationError from "../errors/AuthorizationError";

export const authMiddleware = async (ctx: koa.Context, next: koa.Next) => {
    const token = ctx.headers.authorization?.split(' ')[1];
    if (!token) {
        ctx.throw(401, 'Authorization token required');
    }
    try {
        ctx.state.user = verifyToken(token);
        await next();
    } catch (err) {
        if (err instanceof AuthorizationError) {
            ctx.throw(401, err.message);
        } else {
            throw err;
        }
    }
};
