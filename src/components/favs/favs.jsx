import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import './favs.scss';

export function Favs() {
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

  return (
    
  );
}