import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/viewalluser");
                setUsers(response.data);
                
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message); 
            }
            
        };
        fetchData();
    }, []);

   
    if (error) {
        return <div>Error: {error}</div>; 
    }


    console.log(users);
    

    return (
        <div className='userTable'>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Profile Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username} {user.lname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
    {user.profilePhoto && (
        <img
            src={`http://localhost:8000/uploads/profilePhotos/${user.profilePhoto}`} 
            alt={user.username}
            style={{ width: '50px', height: '50px' }}
        />
    )}
</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


export default User;



    
