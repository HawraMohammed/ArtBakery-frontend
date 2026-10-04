// SignUpForm.jsx

import { useContext, useState } from 'react';
import { Link, Links, useNavigate } from 'react-router';
// Services
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';


const SignUpForm = (props) => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    phone: ''
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }

  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">ARTBAKERY</div>

          <h1>Create Account 🍪</h1>
          <p className="auth-subtitle">Join our cookie family</p>
          <p>{message}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor='username' className="form-label">Username:</label>
              <input
                type='text'
                id='name'
                value={username}
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
                id='password'
                value={password}
                name='password'
                onChange={handleChange}
                required
                className="form-control auth-input"
              />
            </div>
            <div className="mb-3">
              <label htmlFor='confirm' className="form-label">Confirm Password:</label>
              <input
                type='password'
                id='confirm'
                value={passwordConf}
                name='passwordConf'
                onChange={handleChange}
                required
                className="form-control auth-input"
              />
            </div>
            <div className="mb-3">
              <label htmlFor='phone' className="form-label">Phone number:</label>
              <input
                type='phone'
                autoComplete='off'
                id='phone'
                value={formData.phone}
                name='phone'
                onChange={handleChange}
                required
                className="form-control auth-input"
              />
            </div>
            <div className="auth-buttons">
              <button className="auth-button" disabled={isFormInvalid()}>Sign Up</button>
              <button className="auth-cancel" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;