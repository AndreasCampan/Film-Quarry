import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.loggingIn(username);
  };

  const handleRegistration = () => {
    let reg = false
    props.regData(reg);
  }

  return (
    <div className="center">
      <h1 className="title">Film Quarry</h1>
      <Form>
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
    </div>
  );
}

LoginView.propTypes = {
  regData: PropTypes.func.isRequired,
  loggingIn: PropTypes.func.isRequired
};