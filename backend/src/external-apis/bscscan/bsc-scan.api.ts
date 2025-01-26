import ApiService from "../api-service";
import BigNumber from "bignumber.js";
import CoinMarketCapApi from "../coin-marketup/coin-market-cap.api";

const coinMarketCap = new CoinMarketCapApi(process.env.COIN_MARKET_CAP_URI as string || 'https://pro-api.coinmarketcap.com');

class BscScanApi extends ApiService {
    private apiKey: string;

    constructor(baseUrl: string, apiKey: string) {
        super(baseUrl);
        this.apiKey = apiKey;
    }

    async getBalance(address: string): Promise<string> {
        console.log(this.baseUrl);
        const response = await this.fetch<{ result: string }>(this.baseUrl, {
            module: 'account',
            action: 'balance',
            address: address,
            tag: 'latest',
            apikey: this.apiKey,
        });

        console.log(response);
        console.log(this.apiKey);

        return new BigNumber(response.result).dividedBy(1e18).toFixed(8);
    }

    async getBinanceBalanceInUSD(address: string): Promise<string> {
        const bnbBalance = await this.getBalance(address);
        const bnbPrice = await coinMarketCap.getCryptoPrice('BNB');
        console.log(bnbBalance);
        const balance = new BigNumber(bnbBalance);
        const price = new BigNumber(bnbPrice);
        console.log(price.toFixed(2))
        const balanceInUSD = balance.multipliedBy(price);

        return balanceInUSD.toFixed(2);
    }
}

export default BscScanApi;
