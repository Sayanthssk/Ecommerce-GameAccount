import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const SellerHome = () => {

  const navigate = useNavigate()

  const handleEditProfile = () => {
    navigate('/profile')
  }
  

  const handleAddProduct = () => {
    navigate('/add')
  }

  return (
    <div>
     <Nav />
      {/* Main Content */}
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Seller's Dashboard</h1>
        <div className="row mt-4">
          {/* Image 1 */}
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Product" />
              <div className="card-body">
                <h5 className="card-title">Product 1</h5>
                <p className="card-text">Add your product details.</p>
                <button onClick={handleAddProduct} className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Orders" />
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <p className="card-text">View and manage your orders.</p>
                <button  className="btn btn-primary">View Orders</button>
              </div>
            </div>
          </div>

          {/* Image 3 */}
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Profile" />
              <div className="card-body">
                <h5 className="card-title">Profile</h5>
                <p className="card-text">Update your profile details.</p>
                <button className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Seller Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SellerHome;
