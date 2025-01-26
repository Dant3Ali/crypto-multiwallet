import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Balance from "../components/Balance";

const Wallet = () => {
    const [wallets, setWallets] = useState([]);
    const [currency, setCurrency] = useState('BTC');
    const [seedPhrase, setSeedPhrase] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/wallet', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWallets(response.data);
            } catch (error) {
                alert('Ошибка загрузки кошельков');
            }
        };

        fetchWallets();
    }, [token]);

    const handleImport = async () => {
        try {
            await axios.post(
                'http://localhost:3000/wallet/import',
                { seedPhrase, currency },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Кошелек добавлен');
        } catch (error) {
            alert('Ошибка импорта');
        }
    };

    return (
        <div>
            <h3>Мои кошельки</h3>
            {wallets.map((wallet) => (
                <Balance
                    key={wallet.address}
                    currency={wallet.currency}
                    address={wallet.address}
                />
            ))}
            <hr/>
            <h4>Импортировать кошелек</h4>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Сид фраза"
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
            />
            <select
                className="form-select mb-2"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            >
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
                <option value="DOGE">DOGE</option>
                <option value="BNB">BNB</option>
            </select>
            <button onClick={handleImport} className="btn btn-success">
                Импортировать
            </button>
            <p></p>
        </div>
    );
};

export default Wallet;
