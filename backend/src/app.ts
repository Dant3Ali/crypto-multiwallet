import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import walletRoutes from './routes/wallet'
import {connectDB} from "./config/db.config";
import auth from "./routes/authorization";
import cors from '@koa/cors'

async function start () {
    const app = new Koa();
    await connectDB();

    app.use(cors({
        origin: 'http://localhost:3001',
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization'],
    }));

    app.use(bodyParser());
    app.use(walletRoutes.routes());
    app.use(auth.routes());
    app.use(cors())
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();