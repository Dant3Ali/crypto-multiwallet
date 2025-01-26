import {Connection, PublicKey} from "@solana/web3.js";
import CoinMarketCapApiService from "../coin-marketup/CoinMarketCapApiService";
import BigNumber from "bignumber.js";
import ApiService from "../ApiService";


class MainnetApi extends ApiService {
    private connection: Connection;

    constructor(baseUrl: string) {
        super(baseUrl);
        this.connection = new Connection(baseUrl);
    }

    async getBalance(address: string): Promise<string> {
        const publicKey = new PublicKey(address);
        const solBalance = await this.connection.getBalance(publicKey);
        return (solBalance / 1e9).toFixed(9);
    }

    async getSolanaBalanceInUSD(address: string): Promise<string> {
        const coinMarketCap = new CoinMarketCapApiService(process.env.COIN_MARKET_CAP_URI as string);
        let coins = await this.getBalance(address);
        const solPrice = await coinMarketCap.getCryptoPrice('SOL');

        const balance = new BigNumber(coins);
        const price = new BigNumber(solPrice);
        const balanceInUSD = balance.multipliedBy(price);

        return balanceInUSD.toFixed(2);
    }
}

export default MainnetApi;