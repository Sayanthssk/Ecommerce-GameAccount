import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/UpdateGameAccount.css';

const UpdateGameAccount = () => {
    const { id } = useParams();
    const [gameAccount, setGameAccount] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const userId = id || localStorage.getItem('userid');

    useEffect(() => {
        const fetchGameAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/viewbyuser/${userId}`);
                setGameAccount(response.data);
                setScreenshots(response.data.screenshots || []);
            } catch (err) {
                setError('Failed to fetch game account details');
                console.error(err);
            }
        };

        if (userId) {
            fetchGameAccount();
        } else {
            setError("User ID not found");
        }
    }, [userId]);

    const handleUpdateAccount = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/updategame/${userId}`, { ...gameAccount, screenshots });
            setIsEditing(false);
            navigate('/gameaccounts');
        } catch (err) {
            setError('Failed to update game account');
            console.error(err);
        }
    };

    const handleAddScreenshot = () => {
        const newScreenshot = prompt('Enter the URL of the new screenshot:');
        if (newScreenshot) {
            setScreenshots([...screenshots, newScreenshot]);
        }
    };

    const handleRemoveScreenshot = (screenshot) => {
        setScreenshots(screenshots.filter(s => s !== screenshot));
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!gameAccount) {
        return <p>Loading...</p>;
    }

    return (
        <div className="game-account-detail">
            <h2>{isEditing ? "Edit Game Account" : "Game Account Details"}</h2>
            <form onSubmit={handleUpdateAccount} className="game-account-form">
                <div className="profile-section">
                    <img 
                        src={`http://localhost:8000/uploads/profilePhotos/${gameAccount.profilePhoto}`} 
                        alt={gameAccount.username} 
                        className="profile-image" 
                    />
                </div>

                <div className="info-section">
                    <div className="field">
                        <label>Username:</label>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={gameAccount.username} 
                                onChange={(e) => setGameAccount({ ...gameAccount, username: e.target.value })}
                            />
                        ) : (
                            <p>{gameAccount.username}</p>
                        )}
                    </div>
                    
                    <div className="field">
                        <label>Email:</label>
                        {isEditing ? (
                            <input 
                                type="email" 
                                value={gameAccount.email} 
                                onChange={(e) => setGameAccount({ ...gameAccount, email: e.target.value })}
                            />
                        ) : (
                            <p>{gameAccount.email}</p>
                        )}
                    </div>
                    
                    <div className="field">
                        <label>Game Name:</label>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={gameAccount.gameName} 
                                onChange={(e) => setGameAccount({ ...gameAccount, gameName: e.target.value })}
                            />
                        ) : (
                            <p>{gameAccount.gameName}</p>
                        )}
                    </div>
                    
                    <div className="field">
                        <label>Description:</label>
                        {isEditing ? (
                            <textarea 
                                value={gameAccount.description} 
                                onChange={(e) => setGameAccount({ ...gameAccount, description: e.target.value })}
                            />
                        ) : (
                            <p>{gameAccount.description}</p>
                        )}
                    </div>
                    
                    <div className="field">
                        <label>Price:</label>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={gameAccount.price} 
                                onChange={(e) => setGameAccount({ ...gameAccount, price: e.target.value })}
                            />
                        ) : (
                            <p>${gameAccount.price}</p>
                        )}
                    </div>

                    <div className="screenshots">
                        <h4>Screenshots</h4>
                        {isEditing && (
                            <button type="button" className="add-screenshot" onClick={handleAddScreenshot}>Add Screenshot</button>
                        )}
                        {screenshots.map((screenshot, index) => (
                            <div key={index} className="screenshot-wrapper">
                                <img src={`http://localhost:8000/uploads/screenshots/${screenshot}`} alt={`screenshot ${index + 1}`} className="screenshot-image" />
                                {isEditing && (
                                    <button className="remove-screenshot" onClick={() => handleRemoveScreenshot(screenshot)}>Remove</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="button-group">
                    {isEditing ? (
                        <>
                            <button type="submit" className="save-button">Save Changes</button>
                            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Edit Account</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UpdateGameAccount;
