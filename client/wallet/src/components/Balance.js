import React, { useState } from 'react';
import axios from 'axios';

const Balance = ({ currency, address }) => {
    const [balance, setBalance] = useState(null);
    const [usdBalance, setUsdBalance] = useState(null);
    const token = localStorage.getItem('token');

    const fetchBalance = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/wallet/balance/${currency}/${address}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBalance(response.data.balance);

            const usdRate = await fetchExchangeRate(currency);
            setUsdBalance((response.data.balance * usdRate).toFixed(2));
        } catch (error) {
            alert('Ошибка получения баланса');
        }
    };

    const fetchExchangeRate = async (currency) => {
        const rates = { BTC: 30000, ETH: 2000, SOL: 25, DOGE: 0.1 };
        return rates[currency] || 1;
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{currency}</h5>
                <p className="card-text">
                    Адрес: <strong>{address}</strong>
                </p>
                <button onClick={fetchBalance} className="btn btn-primary">
                    Показать баланс
                </button>
                {balance !== null && (
                    <div className="mt-3">
                        <p>Баланс: {balance} {currency}</p>
                        <p>В USD: ${usdBalance}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Balance;
