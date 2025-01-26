import ApiService from '../ApiService';

class CoinMarketCapApiService extends ApiService {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getCryptoPrice(symbol: string): Promise<number> {
        const endpoint = `${this.baseUrl}/v1/cryptocurrency/quotes/latest`;
        const data = await this.fetch<any>(endpoint, {
            symbol,
            convert: 'USD',
            'CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP,
        });

        if (!data.data || !data.data[symbol]) {
            throw new Error(`Price data for ${symbol} not found`);
        }

        return data.data[symbol].quote.USD.price;
    }
}

export default CoinMarketCapApiService;