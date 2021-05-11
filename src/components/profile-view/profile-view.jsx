import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    let { user, token, userData, onNewUser} = this.props;

    function updateInfo(token) {
      const userInput = document.getElementById('username');
      const passInput = document.getElementById('password');
      const emailInput = document.getElementById('email');
      const dateInput = document.getElementById('DOB');
      
      const nameChoice = userInput.value || userData.Username;
      const passChoice = passInput.value || userData.Password;
      const emailChoice = emailInput.value || userData.Email;
      const dateChoice = dateInput.value || userData.DOB;

      // console.log(nameChoice);
      // console.log(passChoice);
      // console.log(emailChoice);
      // console.log(dateChoice);
      // console.log(token);

      axios.put(`https://filmquarry.herokuapp.com/users/${user}`, 
      { 
        Username: nameChoice, Password: passChoice, Email: emailChoice, DOB: dateChoice 
      },
      { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}}
      )
      .then(response => {
        console.log('Success with updating account information');
        let userData2 = response.data;
        onNewUser(userData2);
        if (nameChoice !== userData.Username) {
          window.location = `/users/${userData2.Username}`;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function Date() {
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
            <div className=" my-2"><strong>Date of Birth:</strong> {`${Date()}`}</div>
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
          <div className=" my-2"><strong>Date of Birth:</strong> {`${Date()}`}</div>
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
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" placeholder="New Email"/>
              <div id="email-err" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="DOB">Date of Birth:</label>
              <input id="DOB" type="Date"/>
              <div id="Date" className="error"></div>
            </div>
            
            <div className="middle">
              <Button className="m-3 bttn" variant="info" type="button" onClick={(e) =>{updateInfo(token)}}>Update</Button>
              <Link to={`/`}>
                <Button className="m-3 bttn" variant="info" type="button">Go Back</Button>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}