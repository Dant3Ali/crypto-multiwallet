import axios, {AxiosInstance} from 'axios';

abstract class ApiService {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async fetch<T>(url: string, params?: Record<string, any>): Promise<T> {
        try {
            const response = await axios.get<T>(url, { params });
            return response.data;
        } catch (error) {
            throw new Error(
                `Error fetching data from API with url ${url}: ${(error instanceof Error ? error.message : String(error))}`
            );
        }
    }
}

export default ApiService;