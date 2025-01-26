import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import walletRoutes from './routes/wallet'
import {connectDB} from "./config/db.config";
import auth from "./routes/authorization";

async function start () {
    const app = new Koa();
    await connectDB();
    app.use(bodyParser());
    app.use(walletRoutes.routes());
    app.use(auth.routes());
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();