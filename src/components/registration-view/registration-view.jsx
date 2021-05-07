import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [DOB, setDOB] = useState('')

  // function sendForm() {
  //   alert('Thank you for your Registration');
  //   let reg = true
  //   props.regData(reg);
  // }

  const handleReg = () => {
    console.log('here');
    axios.post('https://filmquarry.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      DOB: DOB
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log(username, password, email, DOB)
      console.log(e);
      console.log('error registering the user');
    });
  }

  function nameinput() {
    const nameError = document.getElementById('user');
    if (!username) {
      nameError.innerText = 'please enter username';
      console.log('please');
    } else {
      return true;
    }
  }

  function validation() {
    const valName = nameinput();
    return valName;
  }

  const validate = (e) => {
    if (validation()) {
      handleReg()
    }
    console.log('not submitted');
  }

  return (
    <div className="center">
      <h1 className="title">Create Account</h1>
      
      <Form noValidate>
        <div id="user" className="error"></div>
        <Form.Group controlId="formUsername">
          <Form.Label>* Username:</Form.Label>
          <Form.Control placeholder="Min. 5 letters" type="text" onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>* Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formemail">
          <Form.Label>* Email:</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formDOB">
          <Form.Label>* Date of Birth:</Form.Label>
          <Form.Control type="date" onChange={e => setDOB(e.target.value)}/>
        </Form.Group>

        <div className="middle">
          <Button className="m-3" variant="info" type="button" onClick={validate}>Register</Button>
        </div>
      </Form>
    </div>
  );
}

//RegistrationView.propTypes = {
//  regData: PropTypes.func.isRequired
//};
