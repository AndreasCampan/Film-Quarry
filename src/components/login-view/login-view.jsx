import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function errorMsg() {
    const error = document.getElementById('error');
    error.innerText = "Incorrect Username or Password";
  }
  

  const handleSubmit = (e) => {
    const showSpinner = document.getElementById('loginSpinner');
    showSpinner.hidden = false;
    e.preventDefault();
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
      const showSpinner = document.getElementById('loginSpinner');
      setTimeout(() => {showSpinner.hidden = true, errorMsg();}, 500);
      
    });
  };

  return (
    <div className="center">
      <h1 className="title">Film Quarry</h1>
      <Form noValidate>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <div id="error" className="err"></div>
        <div className="middle">
          <Button className="mx-3 mb-3" variant="info" type="submit" onClick={handleSubmit}>
            <Spinner className="mx-1" id="loginSpinner" as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden /> Login</Button>
          <Link to={`/register`}>
            <Button className="mx-3 mb-3" variant="info" type="link">Register</Button>
          </Link>
        </div>
      </Form>
      <p className="middle">Do you want a sneak peak? </p>
      <p>
        Username: testuser<br/>
        Password: test123
      </p>
      <a href="https://andreascampan.github.io/AC-Portfolio" target="_blank">
        <div className="logo"></div>
      </a>
    </div>
  );
}

LoginView.propTypes = {
  loggingIn: PropTypes.func.isRequired
};