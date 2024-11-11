import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    confirmPassword: '',
    role: '', // Add role to form data
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('role', formData.role); // Include role in form data
    data.append('address[street]', formData.street);
    data.append('address[city]', formData.city);
    data.append('address[state]', formData.state);
    data.append('address[zipCode]', formData.zipCode);
    data.append('address[country]', formData.country);

    if (profilePhoto) {
      data.append('profilePhoto', profilePhoto);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('Username')) {
          alert('Error: Username already exists');
        } else if (errorMessage.includes('Email')) {
          alert('Error: Email already exists');
        } else if (errorMessage === 'Invalid user data') {
          alert('Error: Invalid user data');
        } else {
          alert('Error: ' + errorMessage);
        }
      } else {
        alert('Error during signup: ' + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleInputChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} required />

      {/* Role selection */}
      <select name="role" value={formData.role} onChange={handleInputChange} required>
        <option value="">Select Role</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      {/* Address fields */}
      <input type="text" name="street" placeholder="Street" onChange={handleInputChange} required />
      <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
      <input type="text" name="state" placeholder="State" onChange={handleInputChange} required />
      <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleInputChange} required />
      <input type="text" name="country" placeholder="Country" onChange={handleInputChange} required />

      {/* Profile photo */}
      <input type="file" name="profilePhoto" onChange={handleFileChange} accept="image/*" />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
