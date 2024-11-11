import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(''); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                username,
                password,
            });
            
            const { id: userId, role } = response.data.user;
            
            // Store user ID in localStorage
            localStorage.setItem('userid', userId);
            setUserId(userId);

            // Navigate based on user role
            if (role === 'buyer') {
                navigate('/buyer');
            } else if (role === 'seller') {
                navigate('/seller');
            } else if (role === 'admin') {
                navigate('/admin');
            } else {
                // Default case if role is undefined or unknown
                alert('Unknown user role');
            }
            
            console.log('User ID:', userId); 
            alert('Login successful');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='body'>
            <form onSubmit={handleLogin} className='card'>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className='btn'>
                    <button type="submit" className='buton'>Login</button>
                </div>
                <p>If you don't have an account? <Link to='/signup'>Signup</Link></p>
            </form>
            {userId && <p>User ID: {userId}</p>} 
        </div>
    );
};

export default Login;
