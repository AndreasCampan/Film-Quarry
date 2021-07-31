import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { userData, movieData, user, token, onGetAcc } = this.props;    

    function toggleHeart2(userData, id) {
      if(userData.movieFav.includes(id)){
        return 'favourites-active'
      } else {
        return 'favourites'
      }
    }

    function favourite(movieData, user, token, userData){
      if (userData.movieFav.includes(movieData._id)) {
        axios.delete(`https://filmquarry.herokuapp.com/users/${user.user}/Movies/${movieData._id}`,
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then(response => {
          onGetAcc(token, user);
        })
        .catch(e => {
          console.log(e);
        })
      } else {
        axios.patch(`https://filmquarry.herokuapp.com/users/${user.user}/Movies/${movieData._id}`, { 
          Username: user.user
        },
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then((response) => {
          onGetAcc(token, user);
        })
        .catch(e => {
          console.log('There is an error');
          console.log(e);
        })
      }
    }

    const whatHeart = toggleHeart2(userData, movieData._id);

    return (
      <Card className=" mb-4 cardbox">
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
            <div className={`${whatHeart}`} type="button" onClick={ () => {  favourite(movieData, user, token, userData); } }> 
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
  }).isRequired,
  user: PropTypes.shape({
    user: PropTypes.string.isRequired
  }).isRequired,
  userData: PropTypes.shape().isRequired,
  token: PropTypes.string.isRequired,
  onGetAcc: PropTypes.func.isRequired
};
