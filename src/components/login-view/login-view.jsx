import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function errorMsg() {
    console.log('no such user');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://filmquarry.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(
    res => {
      const data = res.data;
      props.loggingIn(data);
    })
    .catch(() => {
      errorMsg();
    });
  };

  const handleRegistration = () => {
    let reg = false
    props.regData(reg);
  }

  return (
    <div className="center">
      <h1 className="title">Film Quarry</h1>
      <Form noValidate>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <div className="middle">
          <Button className="m-3" variant="info" type="submit" onClick={handleSubmit}>Submit</Button>
          <Button className="m-3" variant="info" type="link" onClick={handleRegistration}>Register</Button>
        </div>
      </Form>
      <p>User for testing.<br/>
        Username: testuser<br/>
        Password: test123
      </p>
    </div>
  );
}

LoginView.propTypes = {
  regData: PropTypes.func.isRequired,
  loggingIn: PropTypes.func.isRequired
};