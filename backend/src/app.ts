import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import walletRoutes from './routes/wallet'
import currencyRoutes from './routes/currencies';
import {connectDB} from "./common/config/db.config";
import authenticationRoutes from "./routes/authentication";

const app = new Koa();

connectDB();
app.use(bodyParser());
app.use(walletRoutes.routes());
app.use(currencyRoutes.routes());
app.use(authenticationRoutes.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
