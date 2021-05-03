import React from 'react';
<<<<<<< Updated upstream
=======
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';
>>>>>>> Stashed changes

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card className="card my-4">
        <span className="cent">
        <Card.Img className="cardimg size" variant="top" src={movieData.ImagePath} />
        </span>
        <Card.Body>
          <Card.Title className="cent" >{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description.slice(0, 90)} ...'</Card.Text>
          <div className="cent">
          <Button onClick={() => { onMovieClick(movieData); }} variant="info" >Show More</Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}