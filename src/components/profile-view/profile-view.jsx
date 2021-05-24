import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { ConfirmDel } from '../delete-modal/delete-modal';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  render() {
    let { user, token, history, userData, onNewUser, onSignOut} = this.props;
    let { year, month, day } = this.state;
    
    // Date of Birth picker max setting
    function datePicker() {
      if(month < 10) {
        month = '0' + month.toString();
      }
      if(day < 10) {
        day = '0' + day.toString();
      }
      let MaxDate = `${year}-${month}-${day}`;
      return MaxDate;
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

    function updateInfo(token) {
      const userInput = document.getElementById('username');
      const passInput = document.getElementById('password');
      const passVerInput = document.getElementById('passwordVer');
      const emailInput = document.getElementById('email');
      const dateInput = document.getElementById('DOB');

      // Username logic
      const nameChoice = userInput.value || userData.Username;
      const userErr = document.getElementById('user');

      if (userInput.value.length > 12) {
        return showErrorMessage(userErr, 'Max 12 characters');
      } else if (!userInput.value.match(/^[a-z0-9]*$/i)) {
        return showErrorMessage(userErr, 'Letters and numbers only');
      } else if (userInput.value.length >= 1 && userInput.value.length < 5 ) {
        return showErrorMessage(userErr, 'Min 5 characters');
      } else {
        hideError(userErr);
      }

      // Date of Birth logic
      const dateChoice = dateInput.value || userData.DOB.slice(0, 10);
      const dateErr = document.getElementById('Date');

      if( dateInput.value.slice(0, 4) > year) {
        return showErrorMessage(dateErr, 'You are not from the future');
      } else if(dateChoice.length > 10) { 
        return showErrorMessage(dateErr, 'Please select a valid email');
      } else {
        hideError(dateErr);
      }

      // Email logic
      const emailChoice = emailInput.value || userData.Email;
      const emailErr = document.getElementById('email');
      if (emailChoice.indexOf('@') === -1) {
        showErrorMessage(emailErr, 'Please provide a valid email');
      } else if (emailChoice.indexOf('.') === -1) {
        showErrorMessage(emailErr, 'Please provide a valid email');
      } else {
        hideError(emailErr);
      }
      
      
      // Password logic
      let passChoice = null;
      if (passInput.value == "") {
        passChoice = "";
      } else {
        passChoice = passInput.value;
      }

      if (passInput.value === passVerInput.value) {
        axios.put(`https://filmquarry.herokuapp.com/users/${user.user}`, 
        { 
          Username: nameChoice, Password: passChoice, Email: emailChoice, DOB: dateChoice 
        },
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}}
        )
        .then(response => {
          let userData2 = response.data;
          onNewUser(userData2);
          
          // if (userInput.value != "") {
          //   setTimeout(window.location = `/users/${userData2.Username}`, 1000);
          // }
          // if (passChoice != "") {
          //   setTimeout(window.location = `/users/${userData2.Username}`, 1000);
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        const passErr = document.getElementById('pass');
        const passErrVer = document.getElementById('passVer');
        passErr.innerText = "The passwords must match";
        passErrVer.innerText = "The passwords must match";
      }
    }

    function deleteAcc(token) {
      axios.delete(`https://filmquarry.herokuapp.com/users/${user.user}`, 
      { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
      .then(response => {
        console.log(response);
        console.log(`${user.user} has been deleted`);
        onSignOut(null);
        history.push('/');
      })
      .catch(e => {
        console.log(e);
      })
    }
    

    function presentDate() {
      const formDate = userData.DOB;
      return formDate.slice(0, 10);
    }

    if (userData.Username === 'testuser') {
      return (
        <>
        <div className="centerProfile">
          <h1 className="title my-4">Hello {`${userData.Username}`},</h1>
          <h2 className="title-2 my-4">Current Information</h2>
          <div className="align-text-left">
            <div className=" my-2"><strong>Username:</strong> {`${userData.Username}`}</div>
            <div className=" my-2"><strong>Email:</strong> {`${userData.Email}`}</div>
            <div className=" my-2"><strong>Date of Birth:</strong> {`${presentDate()}`}</div>
          </div>
            <h2 className="title-2 my-4">Update Information</h2>
            <div>The testuser account info cannot be updated!</div>
          </div>
        </>
      );
    }
    return (
      <>
      <div className="centerProfile">
        <h1 className="title my-4">Hello {`${userData.Username}`},</h1>
        <h2 className="title-2 my-4">Current Information</h2>
        <div className="align-text-left">
          <div className=" my-2"><strong>Username:</strong> {`${userData.Username}`}</div>
          <div className=" my-2"><strong>Email:</strong> {`${userData.Email}`}</div>
          <div className=" my-2"><strong>Date of Birth:</strong> {`${presentDate()}`}</div>
        </div>
          <h2 className="title-2 my-4">Update Information</h2>
          <form noValidate className="form">

            <div className="input-wrap">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" placeholder="New Username"/>
              <div id="user" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" placeholder="New Password"/>
              <div id="pass" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="password Verification">Verify Password:</label>
              <input id="passwordVer" type="password" placeholder="Verify Password Change"/>
              <div id="passVer" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" placeholder="New Email" />
              <div id="email-err" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="DOB">Date of Birth:</label>
              <input id="DOB" type="Date" max={datePicker()}/>
              <div id="Date" className="error"></div>
            </div>
            
            <div className="middle">
              <Button className="m-3 bttn" variant="info" type="button" onClick={() =>{updateInfo(token)}}>Update</Button>
              <Link to={`/`}>
                <Button className="m-3 bttn" variant="info" type="button">Go Back</Button>
              </Link>
              <ConfirmDel history={history} onSignOut={onSignOut} deleteAcc={deleteAcc} token={token} />
            </div>
          </form>
        </div>
      </>
    );
  }
}

ProfileView.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  onNewUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.string.isRequired
  }).isRequired,
  userData: PropTypes.shape().isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired
};