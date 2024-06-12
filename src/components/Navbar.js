import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/style.css';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('Token');
    if (token === '1111') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
    }
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
      <a href="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h1 className="m-0 text-primary text-3xl" ><i className="far fa-hospital me-3 text-3xl"></i>RMDI</h1>
      </a>
      <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} style={{ fontSize: '20px' }}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} style={{ fontSize: '20px' }}>About</NavLink>
          <NavLink to="/Service" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} style={{ fontSize: '20px' }}>Service</NavLink>
          <NavLink to="/AI" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} style={{ fontSize: '20px' }}>AI</NavLink>
          <NavLink to="/Contact" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} style={{ fontSize: '20px' }}>Contact</NavLink>
        </div>
        {isLoggedIn ? (
          <button onClick={toggleLogin} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
            Logout<i className="fa fa-arrow-right ms-3"></i>
          </button>
        ) : (
          <a href="/login/SelectLogin" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Login<i className="fa fa-arrow-right ms-3"></i></a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
