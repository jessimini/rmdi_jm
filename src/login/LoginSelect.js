import React from 'react';
import "./LoginSelect.css"
import { Link } from 'react-router-dom'; // Importing react-router-dom for navigation

function LoginSelect() {
  return (
    <div className="login-select-container">
      <h1>Welcome to RMDI</h1>
      <p>Select your login type:</p>
      <div>
        <Link to="/login/DoctorLogin" className="login-select-link">Doctor Login</Link> {/* <a>를 <Link>로 변경 */}
        <br></br>
        <Link to="/login/PatientLogin" className="login-select-link">Patient Login</Link>
      </div>
    </div>
  );
}

export default LoginSelect;
