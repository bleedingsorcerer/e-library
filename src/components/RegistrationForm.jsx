// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; 

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institutionalCredentials, setInstitutionalCredentials] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    if (institutionalCredentials) {
      // Add institutional credentials to user data
      userData.institutionalCredentials = {
        username: institutionalCredentials.username,
        password: institutionalCredentials.password,
      };
    }

    axios.post('/api/register', userData)
      .then((response) => {
        console.log(response.data);
        // Handle successful registration
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleInstitutionalCredentialsChange = (event) => {
    setInstitutionalCredentials({
      ...institutionalCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Institutional Credentials:
        <input
          type="checkbox"
          checked={institutionalCredentials}
          onChange={(event) => setInstitutionalCredentials(event.target.checked)}
        />
      </label>
      {institutionalCredentials && (
        <div>
          <label>
            Username:
            <input
              type="text"
              value={institutionalCredentials.username}
              onChange={handleInstitutionalCredentialsChange}
              name="username"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={institutionalCredentials.password}
              onChange={handleInstitutionalCredentialsChange}
              name="password"
            />
          </label>
        </div>
      )}
      <button type="submit">Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default RegistrationForm;