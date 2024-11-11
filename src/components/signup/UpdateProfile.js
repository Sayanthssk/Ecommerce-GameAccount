import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = localStorage.getItem('userid'); // Fetch user ID from local storage
                const response = await axios.get(`http://localhost:8000/api/viewuser/${userId}`);
                setProfileData(response.data); // Populate the state with fetched data
            } catch (err) {
                setError('Failed to fetch profile data');
                console.error(err);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested object update for address fields
        if (name.startsWith('address.')) {
            const field = name.split('.')[1]; // Get the field name after 'address.'
            setProfileData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [field]: value,
                },
            }));
        } else {
            setProfileData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userid'); // Get the user ID
            await axios.put(`http://localhost:8000/api/update/${userId}`, profileData); // Send the PUT request
            setSuccessMessage('Profile updated successfully!'); // Set success message
        } catch (err) {
            setError('Failed to update profile');
            console.error(err);
        }
    };

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <h3>Address</h3>
                <div>
                    <label>Street:</label>
                    <input
                        type="text"
                        name="address.street"
                        value={profileData.address.street}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="address.city"
                        value={profileData.address.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="address.state"
                        value={profileData.address.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        name="address.zipCode"
                        value={profileData.address.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="address.country"
                        value={profileData.address.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
