import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView() {

    const username = '';
    const password = '';
    const email = '';
    const DOB = '';

  function sendForm() {
    alert('Thank you for your Registration');
    let reg = true
    props.regData(reg);
  }

  return (
    <div className="center">
      <h1 className="title">Create Account</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Form.Group controlId="formemail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Group controlId="formDOB">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <div className="middle">
          <Button className="m-3" variant="info" type="link" onClick={sendForm}>Register</Button>
        </div>
      </Form>
    </div>
  );
}
