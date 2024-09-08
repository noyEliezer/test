import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // new state to track whether to show or hide the password
  const [companyId, setCompanyId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [authorization, setAuthorization] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  async function getUsers() {
    try {
      const response = await fetch(
        'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/getUsers?OFFSET=0&LIMIT=100',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data.answer;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (users.length) {
      const editedUser = users.find(
        (user) => user.user_id === parseInt(userId)
      );

      setUsername(editedUser.user_name);
      setPassword(editedUser.password);
      setCompanyId(editedUser.company_id);
      setFirstName(editedUser.first_name);
      setLastName(editedUser.last_name);
      setEmail(editedUser.email);
      setPhoneNumber(editedUser.phone);
      setAuthorization(editedUser.role);
      setAddress(editedUser.address_name);
      setArea(editedUser.zone_name);
    }
  }, [users]);

  async function editUserFetch() {
    try {
      const response = await fetch(
        'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/updateUser',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            user_name: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone: phoneNumber,
            address: address,
            area: area,
            role: authorization,
            company_id: companyId,
          }),
        }
      );
      if (!response.ok) {
        if (response.statusText === 'Unauthorized') {
          setError('Please login again');
        }
        throw new Error(response.statusText);
      }
      console.log(response);
      navigate('/admin');
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCompanyIdChange = (event) => {
    setCompanyId(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAuthorizationChange = (event) => {
    setAuthorization(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // toggle showPassword state
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
    } else if (username.length < 4) {
      setError('Username must be at least 4 characters');
    } else if (companyId.length === 0) {
      setError('Must enter company ID');
    } else if (firstName.length < 2) {
      setError('First name must be at least 2 characters');
    } else if (lastName.length < 2) {
      setError('Last name must be at least 2 characters');
    } else if (phoneNumber.length !== 10) {
      setError('Must enter a valid phone number');
    } else if (document.getElementById('authorization').value === 'choose') {
      setError('Must choose an authorization');
    } else if (document.getElementById('Area').value === 'choose') {
      setError('Must enter a geographic area');
    } else if (address === '') {
      setError('Must enter an address');
    } else {
      // submit the form
      editUserFetch();
    }
  };

  return (
    <div>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="editUserBox">
          <form onSubmit={handleSubmit} className="editUserForm">
            <div className="editUserFormContent">
              <label className="editUserLabel" htmlFor="username">
                Username:
                <input
                  id="username"
                  className="editUserInput"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  placeholder="Please enter a username"
                />
              </label>
              <label className="editUserLabel" htmlFor="pass">
                Password:
                <div className="passContent">
                  <input
                    id="pass"
                    className="editUserInput"
                    type={showPassword ? 'text' : 'password'} // show text if showPassword is true, otherwise show password
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Please enter an 8 characters password"
                  />
                  {showPassword && (
                    <VisibilityIcon
                      className="eye"
                      onClick={handleShowPassword}
                    />
                  )}
                  {!showPassword && (
                    <VisibilityOffIcon
                      className="eyeOff"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </label>
              <label className="editUserLabel" htmlFor="firstName">
                First name:
                <input
                  id="firstName"
                  className="editUserInput"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                  placeholder="Please enter a first name"
                />
              </label>
              <label className="editUserLabel" htmlFor="LastName">
                Last name:
                <input
                  id="lastName"
                  className="editUserInput"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                  placeholder="Please enter a last name"
                />
              </label>
              <label className="editUserLabel" htmlFor="Email">
                Email address:
                <input
                  id="email"
                  className="editUserInput"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Please enter a valid email"
                />
              </label>
              <label className="editUserLabel" htmlFor="phoneNumber">
                Phone number:
                <input
                  id="phoneNumber"
                  className="editUserInput"
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                  placeholder="Please enter a valid phone number"
                />
              </label>
              <label className="editUserLabel" htmlFor="Address">
                Living Address:
                <input
                  id="Address"
                  className="editUserInput"
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  required
                  placeholder="Please enter an address"
                />
              </label>
              <label className="editUserLabel" htmlFor="Area">
                Geographic Area:
                <select
                  id="Area"
                  name="Area"
                  className="editUserInput"
                  value={area}
                  onChange={handleAreaChange}
                  required
                >
                  <option value="choose">Choose Geographic Area</option>
                  <option value="center">Central Israel</option>
                  <option value="north">Northern Israel</option>
                  <option value="south">Southern Israel</option>
                </select>
              </label>
              <label htmlFor="authorization" className="editUserLabel">
                Authorization:
                <select
                  id="authorization"
                  name="authorization"
                  className="editUserInput"
                  value={authorization}
                  onChange={handleAuthorizationChange}
                  required
                >
                  <option value="choose">Choose authorization</option>
                  <option value="administrator">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="maintenance">Maintenance man</option>
                </select>
              </label>
              <label className="editUserLabel" htmlFor="companyId">
                Company ID:
                <input
                  id="companyId"
                  className="editUserInput"
                  type="text"
                  value={companyId}
                  onChange={handleCompanyIdChange}
                  required
                  placeholder="Please enter a company id"
                />
              </label>
            </div>
            <div className="editUserFormBtn">
              {error && <div className="editUserError">{error}</div>}
              <button className="editUserButton" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUser;
