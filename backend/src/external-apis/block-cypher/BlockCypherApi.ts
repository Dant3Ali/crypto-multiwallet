import ApiService from "../ApiService";
import BigNumber from "bignumber.js";
import CoinMarketCapApiService from "../coin-marketup/CoinMarketCapApiService";

const coinMarketCap = new CoinMarketCapApiService(process.env.COIN_MARKET_CAP_URI as string || 'https://pro-api.coinmarketcap.com');

class BlockCypherApi extends ApiService {

    async getBalance(address: string, currency: string): Promise<string> {
        const url = `${this.baseUrl}/${currency.toLowerCase()}/main/addrs/${address}/balance`;
        const balanceData = await this.fetch<{ balance: string }>(url);
        return balanceData.balance;
    }

    async getBitcoinBalanceInUSD(address: string): Promise<string> {
        const satoshis = await this.getBalance(address, 'btc');
        const btcPrice = await coinMarketCap.getCryptoPrice('BTC');
        const balance = new BigNumber(satoshis).dividedBy(1e8);
        const price = new BigNumber(btcPrice);
        const balanceInUSD = balance.multipliedBy(price);
        return balanceInUSD.toFixed(2);
    }

    async getEthereumBalanceInUSD(address: string): Promise<string> {
        const balanceWei = await this.getBalance(address, 'eth');
        const ethPrice = await coinMarketCap.getCryptoPrice('ETH');
        const ethBalance = new BigNumber(balanceWei).dividedBy(1e18);
        const price = new BigNumber(ethPrice);
        const balanceInUSD = ethBalance.multipliedBy(price);
        return balanceInUSD.toFixed(2);
    }


    async getDogecoinBalanceInUSD(address: string): Promise<string> {
        const balance = await this.getBalance(address, 'doge');
        const dogePrice = await coinMarketCap.getCryptoPrice('DOGE');
        const dogeBalance = new BigNumber(balance);
        const price = new BigNumber(dogePrice);
        const balanceInUSD = dogeBalance.multipliedBy(price);

        return balanceInUSD.toFixed(2);
    }
}

export default BlockCypherApi
