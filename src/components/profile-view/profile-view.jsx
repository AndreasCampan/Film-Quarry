import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    let { user, token, userData, onNewUser} = this.props;

    // function check() {
    // const userInput = document.getElementById('username');
    //   console.log(userInput.value);
    // }

    function getAcc(token) {
      console.log(token);
      axios.get(`https://filmquarry.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('Success in the get acc');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function updateInfo(token) {
      const userInput = document.getElementById('username');
      const passInput = document.getElementById('password');
      const emailInput = document.getElementById('email');
      const dateInput = document.getElementById('DOB');
      
      const nameChoice = userInput.value || userData.Username;
      const passChoice = passInput.value || false;
      const emailChoice = emailInput.value || userData.Email;
      const dateChoice = dateInput.value || userData.DOB;

      console.log(dateChoice); 
      console.log(nameChoice);
      console.log(passChoice);
      console.log(emailChoice);

      axios.put(`https://filmquarry.herokuapp.com/users/${user}`, 
      ( nameChoice && passChoice  && emailChoice && dateChoice   ? { 
        Username: nameChoice, Password: passChoice, Email: emailChoice, DOB: dateChoice 
      } : (nameChoice && emailChoice && dateChoice ) ? {
          Username: nameChoice, Email: emailChoice, DOB: dateChoice
        } : {Username: nameChoice}
      ),
      { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}}
      )
      .then(response => {
        console.log('Success in the update');
        let userData2 = response.data;
        console.log(response)
        console.log(userData2)
        console.log(userData2.Username + " This is the new name")
        onNewUser(userData2);
        window.location = `/users/${userData2.Username}`;  
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <>
      <div className="centerProfile">
        <Button onClick={() => {getAcc(token)}}>Get Data</Button>
        <div className="box">{`${token}`}</div>
        <div>{`Username: ${userData.Username}`}</div>
        <div>{`Email: ${userData.Email}`}</div>
        <div>{`Date of Birth: ${userData.DOB}`}</div>
        
          <h1 className="title my-4">Update Account</h1>
          <form noValidate className="form">

            <div className="input-wrap">
              <label htmlFor="username"><span className="aster">*</span> Username:</label>
              <input type="text" id="username" />
              <div id="user" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="password"><span className="aster">*</span> Password:</label>
              <input id="password" type="password" />
              <div id="pass" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="email"><span className="aster">*</span> Email:</label>
              <input id="email" type="email" />
              <div id="email-err" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="DOB"><span className="aster">*</span> Date of Birth:</label>
              <input id="DOB" type="Date" />
              <div id="Date" className="error"></div>
            </div>
            
            <div className="middle">
              <Button className="m-3 bttn" variant="info" type="button" onClick={(e) =>{updateInfo(token)}}>Update</Button>
              <Link to={`/`}>
                <Button className="m-3 bttn" variant="info" type="button">Movies</Button>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}