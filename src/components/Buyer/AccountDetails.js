import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/GameAccountDetail.css'; // Ensure you have CSS for styling

const GameAccountDetail = () => {
    const [gameAccount, setGameAccount] = useState(null);
    const [error, setError] = useState('');
    const scrollRef = useRef(null); // Create a ref for the scroll container

    useEffect(() => {
        const accountId = localStorage.getItem('selectedGameAccountId'); // Get the ID from local storage

        if (accountId) {
            const fetchGameAccount = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/view/${accountId}`);
                    setGameAccount(response.data);
                } catch (err) {
                    setError('Failed to fetch game account details');
                    console.error(err);
                }
            };

            fetchGameAccount();
        } else {
            setError('No account ID found in local storage');
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            const scrollInterval = setInterval(() => {
                scrollRef.current.scrollBy({
                    top: 0,
                    left: 100, // Scroll by 100px to the right
                    behavior: 'smooth' // Smooth scroll effect
                });
            }, 3000); // Change screenshots every 3 seconds

            // Clear interval on component unmount
            return () => clearInterval(scrollInterval);
        }
    }, [gameAccount]); // Only run when gameAccount is updated

    if (error) {
        return <p>{error}</p>;
    }

    if (!gameAccount) {
        return <p>Loading...</p>;
    }

    return (
        <div className="game-account-detail">
            <h2 className="account-username">{gameAccount.username}</h2>
            <img
                src={`http://localhost:8000/uploads/profilePhotos/${gameAccount.profilePhoto}`}
                alt={gameAccount.username}
                className="profile-image"
            />
            <p className="account-description">{gameAccount.description}</p>
            <p className="account-price">${gameAccount.price}</p>
            <p className="account-desctiption">{gameAccount.gameName}</p>
            <div className="screenshots" ref={scrollRef}>
                {gameAccount.screenshots.map((screenshot, index) => (
                    <img
                        key={index}
                        src={`http://localhost:8000/uploads/screenshots/${screenshot}`}
                        alt={`Screenshot ${index + 1}`}
                        className="screenshot-image"
                    />
                ))}
            </div>
        </div>
    );
};

export default GameAccountDetail;
