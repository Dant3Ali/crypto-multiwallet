import Router from 'koa-router';
import User from '../models/User';
import {generateToken} from '../services/authService';

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        ctx.throw(400, 'User already exists');
    }
    const user = new User({ email, password });
    await user.save();
    ctx.body = { message: 'User registered successfully' };
});

router.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body as AuthRequestBody;
    if (!email || !password) {
        ctx.throw(400, 'Email and password are required');
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        ctx.throw(400, 'Invalid credentials');
    }

    const token = generateToken(user!.id);
    ctx.body = { token };
});

export default router;
