import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/BuyerHome.css'; // Custom CSS file for additional styles and animations
import BuyerNav from './BuyerNav';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const BuyerHome = () => {
  return (
    <div>
      <BuyerNav />
    <div className="container mt-5 buyer-home">
      {/* Hero Section */}
      <div className="jumbotron text-center p-5 animate-fade-in">
        <h1 className="display-4">Welcome to Buyer Portal</h1>
        <p className="lead">Find the best products and deals curated just for you!</p>
        <Link to = '/game' className="btn btn-primary btn-lg" >Explore Now</Link>
      </div>

      {/* Features Section */}
      <div className="row text-center mt-5">
        <div className="col-md-4 mb-4 animate-slide-up">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Exclusive Deals</h5>
              <p className="card-text">Access limited-time offers and discounts.</p>
              <a href="#" className="btn btn-outline-primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 animate-slide-up delay-1">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Trending Products</h5>
              <p className="card-text">Check out the latest and most popular items.</p>
              <Link to='/game' className="btn btn-outline-primary">View Products</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 animate-slide-up delay-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Personalized Suggestions</h5>
              <p className="card-text">Get recommendations based on your preferences.</p>
              <a href="#" className="btn btn-outline-primary">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />  
    </div>
  );
};

export default BuyerHome;
