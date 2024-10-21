import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css'; // Ensure this file is correctly imported

export default function RegisterPage() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', { name, email, password });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div className="register-page">
      <div className="blur-background"></div> {/* Added blur background */}
      <div className="register-box">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={registerUser}>
          <input 
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <input 
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="register-button" type="submit">Register</button>
          <div className="register-footer">
            Already a member? 
            <Link className="login-link" to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
