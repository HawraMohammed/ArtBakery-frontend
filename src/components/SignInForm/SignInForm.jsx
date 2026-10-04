
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';


const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // This function doesn't exist yet, but we'll create it soon.
      // It will cause an error right now
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">ARTBAKERY</div>

          <h1>Welcome Back 🍪</h1>
          <p className="auth-subtitle">Sign in to your account</p>
          <p>{message}</p>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor='email' className="form-label">Username:</label>
              <input
                type='text'
                autoComplete='off'
                id='username'
                value={formData.username}
                name='username'
                onChange={handleChange}
                required
                className="form-control auth-input"
              />
            </div>
            <div className="mb-3">
              <label htmlFor='password' className="form-label">Password:</label>
              <input
                type='password'
                autoComplete='off'
                id='password'
                value={formData.password}
                name='password'
                onChange={handleChange}
                required
                className="form-control auth-input"
              />
            </div>
            <div className="auth-buttons">
              <button className="auth-button">Sign In</button>
              <button className="auth-cancel" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;
