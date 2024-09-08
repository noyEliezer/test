import { useContext, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../store/cart-context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // new state to track whether to show or hide the password
  const [error, setError] = useState('');
  const { setUser } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      navigate('../missions');
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCompanyIdChange = (event) => {
    setCompanyId(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // toggle showPassword state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim().length < 4) {
      setError('Username must be at least 4 characters');
    } else if (password.trim().length < 8) {
      setError('Password must be at least 8 characters');
    } else if (companyId.trim().length === 0) {
      setError('Company ID must not be empty');
    } else {
      // create the request body
      const requestBody = {
        user_name: username.trim(),
        password: password.trim(),
        company_id: parseInt(companyId.trim()),
      };

      // send the POST request
      try {
        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        if (response.status === 401) {
          setError('Unauthorized user');
        }

        if (response.status === 201) {
          setUser(data.answer);
          localStorage.setItem('token', data.answer.token);
          localStorage.setItem('role', data.answer.role);

          var currentDate = new Date();
          var currentDateWithoutTime = currentDate.toISOString().split('T')[0];
          localStorage.setItem('day', currentDateWithoutTime);
          navigate('../missions');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="loginBox">
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="loginLabel" htmlFor="username">
          Username:
          <input
            id="username"
            className="loginInput"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label className="loginLabel" htmlFor="pass">
          Password:
          <div className="passContent">
            <input
              id="pass"
              className="loginInput"
              type={showPassword ? 'text' : 'password'} // show text if showPassword is true, otherwise show password
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword && (
              <VisibilityIcon className="eye" onClick={handleShowPassword} />
            )}
            {!showPassword && (
              <VisibilityOffIcon
                className="eyeOff"
                onClick={handleShowPassword}
              />
            )}
          </div>
        </label>
        <br />
        <label className="loginLabel" htmlFor="companyId">
          Company ID:
          <input
            id="companyId"
            className="loginInput"
            type="text"
            value={companyId}
            onChange={handleCompanyIdChange}
          />
        </label>

        {error && <div className="loginError">{error}</div>}
        <br />
        <Link to="/forgot">Forgot my password or username</Link>
        <br />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
