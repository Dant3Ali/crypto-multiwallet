import Router from 'koa-router';
import User from '../models/user';
import {generateToken, findUserByEmail, comparePassword, addUser} from '../services/auth.service';

const router = new Router({ prefix: "/auth" });

interface AuthRequestBody {
    email: string;
    password: string;
}

router.post("/register", async (ctx) => {
    const { email, password } = ctx.request.body as AuthRequestBody;
    if (!email || !password) {
        ctx.throw(400, 'Email and password are required');
    }

    const existingUser = await findUserByEmail(email);
    console.log(existingUser)
    if (existingUser) {
        ctx.throw(400, 'User already exists');
    }

    await addUser(email, password)
    ctx.body = { message: 'User registered successfully' };
});

router.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body as AuthRequestBody;
    if (!email || !password) {
        ctx.throw(400, 'Email and password are required');
    }
    const user = await findUserByEmail(email);
    if (!user || !(await comparePassword(user, password))) {
        ctx.throw(400, 'Invalid credentials');
    }

    const token = generateToken(user!.id);
    ctx.body = { token };
});

export default router;
