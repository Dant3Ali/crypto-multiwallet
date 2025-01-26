import Router from 'koa-router';
import {
    generateAddress,
    generateBTCAddress,
    generateDOGEAddress,
    generateSOLAddress,
    getBalance
} from '../services/walletService';
import {authMiddleware} from "../middleware/authMiddleware";
import WalletModel from '../models/Wallet';
import {assertArgument, LangEn} from "ethers";

const router = new Router({ prefix: '/wallet' });

interface ImportSeedBody {
    seedPhrase: string;
    currency: string;
}

router.get('/', authMiddleware, async (ctx) => {
    const userId = ctx.state.user.id;
    ctx.body = await WalletModel.find({userId});
});

router.post('/import', authMiddleware, async (ctx) => {
    const { seedPhrase, currency } = ctx.request.body as ImportSeedBody;
    const userId = ctx.state.user.id
    const wordList = LangEn.wordlist()
    const words = wordList.split(seedPhrase);
    assertArgument((words.length % 3) === 0 && words.length >= 12 && words.length <= 24, "Wrong seed phrase length"
    , "seedPhrase", words.length);

    let address;
    switch (currency.toLowerCase()) {
        case 'btc':
            address = generateBTCAddress(seedPhrase);
            break;
        case 'sol':
            address = generateSOLAddress(seedPhrase);
            break;
        case 'doge':
            address = generateDOGEAddress(seedPhrase);
            break;
        case 'eth':
        case 'bnb':
            address = await generateAddress(seedPhrase);
            break;
        default:
            ctx.throw(400, 'Unsupported currency');
    }


    const wallet = new WalletModel({ seedPhrase, address, userId, currency });
    await wallet.save();

    ctx.body = { wallet };
});

router.get('/balance/:currency/:address', authMiddleware, async (ctx) => {
    const { currency, address } = ctx.params;
    const balance = await getBalance(currency, address);
    ctx.body = { balance };
});

export default router;