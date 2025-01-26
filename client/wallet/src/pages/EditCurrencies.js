import React, { useState } from 'react';

const EditCurrencies = ({ onSave }) => {
    const [currencies, setCurrencies] = useState(['BTC', 'ETH', 'SOL', 'DOGE', 'BNB']);

    const handleAddCurrency = () => {
        const newCurrency = prompt('Введите название новой валюты (например, XRP):');
        if (newCurrency && !currencies.includes(newCurrency.toUpperCase())) {
            setCurrencies([...currencies, newCurrency.toUpperCase()]);
        } else {
            alert('Такая валюта уже добавлена или введено некорректное значение.');
        }
    };

    const handleRemoveCurrency = (currency) => {
        setCurrencies(currencies.filter((c) => c !== currency));
    };

    const handleSave = () => {
        onSave(currencies);
        alert('Список валют обновлен!');
    };

    return (
        <div>
            <h3>Редактировать список валют</h3>
            <ul className="list-group">
                {currencies.map((currency) => (
                    <li key={currency} className="list-group-item d-flex justify-content-between align-items-center">
                        {currency}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveCurrency(currency)}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
            <button className="btn btn-secondary mt-3" onClick={handleAddCurrency}>
                Добавить валюту
            </button>
            <button className="btn btn-primary mt-3 ms-2" onClick={handleSave}>
                Сохранить изменения
            </button>
        </div>
    );
};

export default EditCurrencies;