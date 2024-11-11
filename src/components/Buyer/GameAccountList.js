import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/gameAccountList.css'; // Import the CSS file
import BuyerProdNav from './BuyerProdNav';

const GameAccountList = () => {
    const [gameAccounts, setGameAccounts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGameAccounts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/game`);
                setGameAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch game accounts');
                console.error(err);
            }
        };

        fetchGameAccounts();
    }, []);

    const handleViewDetails = (accountId) => {
        localStorage.setItem('selectedGameAccountId', accountId);
        navigate('/gameaccount');
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <BuyerProdNav />
            <h2>Game Accounts</h2>
            {gameAccounts.map((account) => (
                <div key={account._id} className="game-account-card" onClick={() => handleViewDetails(account._id)}>
                    <img 
                        src={`http://localhost:8000/uploads/profilePhotos/${account.profilePhoto}`} 
                        alt={account.username} 
                        className="profile-image" 
                    />
                    <div className="account-details">
                        <h3 className="account-username">{account.username}</h3>
                        <p className="account-price">${account.price}</p>
                        <p className="account-description">{account.description}</p>
                    </div>
                    <div className="arrow-wrapper" onClick={() => handleViewDetails(account._id)}>
                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M8 5l8 7-8 7-1.5-1.5L12 12 6.5 6.5z" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameAccountList;
