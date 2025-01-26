import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Wallet from './pages/Wallet';
import EditCurrencies from "./pages/EditCurrencies";

function App() {
  return (
      <Router>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/edit-currencies" element={<EditCurrencies />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;