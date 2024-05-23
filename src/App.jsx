import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        const currencyData = data.rates;
        setCurrencies(Object.keys(currencyData));
        setResult((amount * currencyData[toCurrency]).toFixed(2));
      })
      .catch(error => console.error('Error fetching currency data:', error));
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
          const rate = data.rates[toCurrency];
          setResult((amount * rate).toFixed(2));
        })
        .catch(error => console.error('Error fetching conversion rate:', error));
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <select
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span>to</span>
          <select
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <h2>
          {amount} {fromCurrency} = {result} {toCurrency}
        </h2>
      </div>
    </div>
  );
};

export default App;
