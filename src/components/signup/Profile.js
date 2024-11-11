import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Nav from '../Seller/Nav';
import './profile.css'; // Ensure you have this CSS file

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = localStorage.getItem('userid'); 
                if (!userId) {
                    throw new Error('User ID not found');
                }
                const response = await axios.get(`http://localhost:8000/api/viewuser/${userId}`);
                setProfileData(response.data);
            } catch (err) {
                setError('Failed to fetch profile data');
                console.error(err);
            }
        };

        fetchProfileData();
    }, []);

    const handleEdit = () => {
        navigate('/update-profile'); // Navigate to the edit profile page
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!profileData) {
        return <p>Loading profile...</p>; 
    }

    return (
        <div>
            <Nav />
            <div className="profile-container">
                <div className="profile-card">
                    <h2 className="profile-header">User Profile</h2>
                    {profileData.profilePhoto && (
                        <div className="profile-photo">
                            <img
                                src={`http://localhost:8000/uploads/profilePhotos/${profileData.profilePhoto}`}
                                alt={profileData.username}
                                className="profile-img"
                            />
                        </div>
                    )}
                    <div className="profile-info">
                        <p><strong>Username:</strong> {profileData.username}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Phone:</strong> {profileData.phone}</p>
                        <h3>Address</h3>
                        <p><strong>Street:</strong> {profileData.address.street}</p>
                        <p><strong>City:</strong> {profileData.address.city}</p>
                        <p><strong>State:</strong> {profileData.address.state}</p>
                        <p><strong>Zip Code:</strong> {profileData.address.zipCode}</p>
                        <p><strong>Country:</strong> {profileData.address.country}</p>
                    </div>
                    <div className="edit-button-container">
                        <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
