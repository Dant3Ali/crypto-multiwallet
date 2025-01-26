import {ethers} from 'ethers';
import axios from 'axios';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import sol, {Connection, PublicKey} from '@solana/web3.js'
import {dogecoinNetwork} from "../constants/networks/dogecoin.network";
import BlockCypherApi from "../external-apis/block-cypher/block-cypher.api";
import BscScanApi from "../external-apis/bscscan/bsc-scan.api";
import MainnetApi from "../external-apis/mainnet/mainnet-api";

const bipFactory = bip32.BIP32Factory(ecc);

export async function generateAddress(seedPhrase: string): Promise<string> {
    const wallet = ethers.Wallet.fromPhrase(seedPhrase);
    return wallet.getAddress();
}

export function generateBTCAddress(seedPhrase: string): string {
    const seed = bip39.mnemonicToSeedSync(seedPhrase);
    const root = bipFactory.fromSeed(seed);
    const child = root.derivePath("m/44'/0'/0'/0/0");
    const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(child.publicKey.buffer),
    });

    return <string> address;
}

export function generateDOGEAddress(seedPhrase: string): string {
    const seed = bip39.mnemonicToSeedSync(seedPhrase);
    const root = bipFactory.fromSeed(seed);

    const child = root.derivePath("m/44'/3'/0'/0/0");
    const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(child.publicKey),
        network: dogecoinNetwork,
    });

    return address!;
}

export function generateSOLAddress(seedPhrase: string): string {
    const seed = bip39.mnemonicToSeedSync(seedPhrase).slice(0, 32);
    const keyPair = sol.Keypair.fromSeed(seed);
    return keyPair.publicKey.toBase58();
}

export async function getBalance(currency: string, address: string): Promise<string> {
    switch (currency.toLowerCase()) {
        case "btc": {
            const blockCypherApi = new BlockCypherApi(process.env.BLOCK_CYPHER_URI as string);
            return await blockCypherApi.getBitcoinBalanceInUSD(address);
        }
        case "eth": {
            const blockCypherApi = new BlockCypherApi(process.env.BLOCK_CYPHER_URI as string);
            return await blockCypherApi.getEthereumBalanceInUSD(address);
        }
        case "bnb": {
            const bscScanApi = new BscScanApi(process.env.BSCSCAN_URI as string, process.env.ETHERSCAN as string);
            return await bscScanApi.getBinanceBalanceInUSD(address);
        }
        case "doge": {
            const blockCypherApi = new BlockCypherApi(process.env.BLOCK_CYPHER_URI as string);
            return await blockCypherApi.getDogecoinBalanceInUSD(address);
        }
        case "sol": {
            const mainnetApi = new MainnetApi(process.env.SOLANA_URI as string);
            return await mainnetApi.getSolanaBalanceInUSD(address);
        }
        default:
            throw new Error(`Unsupported currency: ${currency}`);
    }
}