import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddGameAccount = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [gameName, setGameName] = useState('');
    const [screenshots, setScreenshots] = useState([]); // For multiple file uploads
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle file input for multiple screenshots
    const handleScreenshotChange = (e) => {
        setScreenshots(e.target.files); // Allow multiple file uploads
    };

    // Handle form submission
    const handleAddGameAccount = async (e) => {
        e.preventDefault();
        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('description', description);
            formData.append('price', price); 
            formData.append('gameName', gameName);
            if (screenshots.length > 0) {
                Array.from(screenshots).forEach((file) => {
                    formData.append('screenshots', file); 
                });
            }

            
            const userId = localStorage.getItem('userid');
            const response = await axios.post(`http://localhost:8000/api/addgameaccount/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            

            alert('Game account added successfully');
            navigate('/userGameAccount'); 
        } catch (error) {
            setError('Error adding game account');
            console.error('Error adding game account:', error);
        }
    };

    return (
        <div>
            <h2>Add Game Account</h2>
            <form onSubmit={handleAddGameAccount} encType="multipart/form-data">
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Game Name:</label>
                    <input
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Screenshots (up to 5):</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleScreenshotChange}
                        accept="image/*"
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Add Game Account</button>
            </form>
        </div>
    );
};

export default AddGameAccount;
