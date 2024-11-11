import React from 'react';
import './styles/nav.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate();

    // // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('userid');  
        alert("Logged out successfully");
        navigate('/');  
    };

    // // Function to navigate to account requests
    // const handleViewRequests = () => {
    //     navigate('/requests');  // Navigate to the requests page
    // };

    // // Function to navigate to update profile
    // const handleUpdateProfile = () => {
    //     navigate('/profile');  // Navigate to the update profile page
    // };

    // // Function to navigate to add game account
    // const handleAddAccount = () => {
    //     navigate('/add');  // Navigate to the add account page
    // };
    // const handleViewAccount = () =>{
    //     navigate('/userGameAccount')
    // } 

    return (
        <div className='bord'>
            {/* <div className='nav'>
                <button onClick={handleViewRequests}>View Requests</button>
                <button onClick={handleUpdateProfile}>Profile</button>
                <button onClick={handleAddAccount}>Add Game Account</button>
                <button onClick={handleViewAccount}>View Game Account</button>
                <button onClick={handleLogout}>Logout</button>
            </div> */}

            
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to='/seller' className="navbar-brand" href="#">Seller Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to='/seller' className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/userGameAccount' className="nav-link" >Products</Link>
              </li>
              <li className="nav-item">
                <Link to='/orders' className="nav-link" >Orders</Link>
              </li>
              <li className="nav-item">
                <Link to='/profile' className="nav-link">Profile</Link>
                
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        </div>
    );
}

export default Nav;
