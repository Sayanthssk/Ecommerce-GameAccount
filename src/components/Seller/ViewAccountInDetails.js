import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Buyer/styles/GameAccountDetail.css';
import Nav from './Nav';

const ViewAccountInDetails = () => {
    const [gameAccount, setGameAccount] = useState(null);
    const [error, setError] = useState('');
    const scrollRef = useRef(null);
    

    useEffect(() => {
        const accountId = localStorage.getItem('selectedGameAccountId');

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
                    left: 100,
                    behavior: 'smooth'
                });
            }, 3000);

            return () => clearInterval(scrollInterval);
        }
    }, [gameAccount]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!gameAccount) {
        return <p>Loading...</p>;
    }



    return (
        <div>
            <Nav />
        <div className="game-account-detail">
           
            <h2 className="account-username">{gameAccount.username}</h2>
            <img
                src={`http://localhost:8000/uploads/profilePhotos/${gameAccount.profilePhoto}`}
                alt={gameAccount.username}
                className="profile-image"
            />
            <p className="account-description">{gameAccount.description}</p>
            <p className="account-price">${gameAccount.price}</p>
            <p className="account-game-name">{gameAccount.gameName}</p>
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
           <Link to='/updateGame' >Update</Link>
        </div>
        </div>
    );
};

export default ViewAccountInDetails;
