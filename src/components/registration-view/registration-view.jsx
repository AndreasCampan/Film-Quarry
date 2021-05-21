import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import './registration-view.scss';

export function RegistrationView() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [DOB, setDOB] = useState('')

  const handleReg = () => {;
    axios.post('https://filmquarry.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      DOB: DOB
    })
    .then(response => {
      const data = response.data;
      window.open('/', '_self');
    })
    .catch(e => {
      console.log(e);
      console.log('error registering the user');
    });
  }

  function hideError(input) {
    const wrapper = input.parentElement;
    const text = wrapper.querySelector('.error');
    text.innerText = ' '
  }
  
  function showErrorMessage(input, message) {
    const wrapper = input.parentElement;
    const text = wrapper.querySelector('.error');
  
    if (message) {
      text.innerText = message;
    }
  }

  function nameInput() {
    const nameText = document.getElementById('user');
    if (!username) {
      showErrorMessage(nameText, 'Please provide a username');
    } else if (!userInput.value.match(/^[a-z0-9]*$/i)) {
      return showErrorMessage(nameText, 'Only numbers and letters are allowed');
    } else {
      hideError(nameText);
      return true;
    }
  }

  function passInput() {
    const passText = document.getElementById('pass');
    if (!password) {
      showErrorMessage(passText, 'Please enter a password');
    } else {
      hideError(passText);
      return true;
    }
  }

  function emailInput() {
    const emailText = document.getElementById('email-err');
    if (!email) {
      showErrorMessage(emailText, 'Please provide an email');
    } else if (email.indexOf('@') === -1) {
      showErrorMessage(emailText, 'Please provide a valid email');
    } else if (email.indexOf('.') === -1) {
      showErrorMessage(emailText, 'Please provide a valid email');
    } else {
      hideError(emailText);
      return true;
    }
  }

  const today = new Date();
  
  function datePicker() {
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    
    if(month < 10) {
      month = '0' + month.toString();
    }
    if(day < 10) {
      day = '0' + day.toString();
    }

    let MaxDate = `${year}-${month}-${day}`;
    return MaxDate;
  }

  function birthInput() {
    const birthText = document.getElementById('Date');
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    function dateChange(DOB) {
      let split = DOB.split("");
      let reverse = split.reverse();
      let join = reverse.join("");
      return join;
    }

    function dateChange2(DOB) {
      let split = DOB.split("");
      let reverse = split.reverse();
      let join = reverse.join("");
      return join;
    }

    let DOB2 = dateChange(DOB);
    let DOB3 = dateChange2(DOB2.slice(6));

    if (!DOB) {
      hideError(birthText);
      showErrorMessage(birthText, 'Please select a date');
      return false;
    } else if (year < DOB3) {
      hideError(birthText);
      showErrorMessage(birthText, 'You are not from the future!');
      return false;
    } else {
      hideError(birthText);
      return true; 
    }
  }

  function validation() {
    const valName = nameInput();
    const valPass = passInput();
    const valEmail = emailInput();
    const valBirth = birthInput();
    return valName && valPass && valEmail && valBirth;
  }

  const validate = (e) => {
    if (validation()) {
     return handleReg()
    }
    console.log('not submitted');
  }

  return (
    <div className="center">
      <h1 className="title">Create Account</h1>
      <form noValidate className="form">

        <div className="input-wrap">
          <label htmlFor="username"><span className="aster">*</span> Username:</label>
          <input type="text" id="username" onChange={e => setUsername(e.target.value)} />
          <div id="user" className="error"></div>
        </div>

        <div className="input-wrap">
          <label htmlFor="password"><span className="aster">*</span> Password:</label>
          <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          <div id="pass" className="error"></div>
        </div>

        <div className="input-wrap">
          <label htmlFor="email"><span className="aster">*</span> Email:</label>
          <input id="email" type="email" onChange={e => setEmail(e.target.value)} />
          <div id="email-err" className="error"></div>
        </div>

        <div className="input-wrap">
          <label htmlFor="DOB"><span className="aster">*</span> Date of Birth:</label>
          <input id="DOB" type="Date" max={datePicker()} onChange={e => setDOB(e.target.value)} />
          <div id="Date" className="error"></div>
        </div>
        
        <div className="middle">
          <Button className="m-3 bttn" variant="info" type="button" onClick={validate}>Create</Button>
          <Link to={`/`}>
            <Button className="m-3 bttn" variant="info" type="button">Go Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}