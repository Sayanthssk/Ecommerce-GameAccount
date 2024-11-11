import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import axios
import'../Buyer/styles/gameAccountList.css'
import Nav from './Nav';

const ViewOwnAccount = () => {
    const [gameAccounts, setGameAccounts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Get the userId from local storage or any other source
    const userId = localStorage.getItem('userid'); // Assuming you store userId in local storage
    console.log(userId);
    

    useEffect(() => {
        const fetchGameAccounts = async () => {
            if (!userId) {
                setError('User ID not found');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/viewbyuser/${userId}`);
                setGameAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch game accounts');
                console.error(err);
            }
        };

        fetchGameAccounts();
    }, [userId]); // Dependency array to re-fetch if userId changes

    const handleViewDetails = (accountId) => {
        localStorage.setItem('selectedGameAccountId', accountId);
        navigate('/ownaccount');
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <Nav />
            <h2>Game Accounts</h2>
            {gameAccounts.length > 0 ? (
                gameAccounts.map((account) => (
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
                ))
            ) : (
                <p>No game accounts found.</p> // Display message if no accounts
            )}
        </div>
    );
};

export default ViewOwnAccount;
