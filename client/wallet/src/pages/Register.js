import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/register', { email, password });
            navigate('/');
        } catch (error) {
            alert('Ошибка регистрации');
        }
    };

    return (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
                <h5 className="card-title text-center">Регистрация</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Зарегистрироваться</button>
                </form>
                <div className="text-center mt-3">
                    <a href="/">Вернуться ко входу</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
