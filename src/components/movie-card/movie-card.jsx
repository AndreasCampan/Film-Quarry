import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { userData, movieData, user, token, onNewFav } = this.props;
    
    
    function removeHeart() {
      document.querySelector('.favourites-active').classList.add('.favourites');
      document.querySelector('.favourites-active').classList.remove('.favourites-active');

    }

    function addHeart() {
      const heartNode = heart.current;
      heartNode.classList.add('.favourites-active');
      heartNode.classList.remove('.favourites');
    }

    function favourite(movieData, user, token, userData){
      console.log(userData.movieFav);
      if (userData.movieFav.includes(movieData._id)) {
        console.log('Deleting');
        axios.delete(`https://filmquarry.herokuapp.com/users/${user}/Movies/${movieData._id}`,
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then(response => {
          removeHeart();
          console.log(response);
          // let userData2 = response.data;
          // onNewFav(userData2);
          console.log(`${movieData.Title} has been removed`);
        })
        .catch(e => {
          console.log('There is an error');
          console.log(e);
        })
      } else {
        console.log('Adding');
        axios.patch(`https://filmquarry.herokuapp.com/users/${user}/Movies/${movieData._id}`, { 
          Username: user
        },
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then(response => {
          addHeart();
          // let userData2 = response.data;
          // onNewFav(userData2);
          console.log(response);
          console.log(`${movieData.Title} has been added`);
        })
        .catch(e => {
          console.log('There is an error');
          console.log(e);
        })
      }
    }

    
    return (
      <Card className="card mb-4 cardbox">
        <span className="cent">
        <Card.Img className="cardimg size" variant="top" src={movieData.ImagePath} />
        </span>
        <Card.Body className="card-space">
          <Card.Title className="cent" >{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description.slice(0, 90)} ...'</Card.Text>
          <div className="cent2">
            <Link to={`/movies/${movieData._id}`}>
              <Button variant="info">Show More</Button>
            </Link>
            <div className="favourites" type="button" ref={heart} onClick={ () => { favourite(movieData, user, token, userData); } }> 
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};