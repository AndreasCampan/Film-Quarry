import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Card className="card mb-4 cardbox">
        <span className="cent">
        <Card.Img className="cardimg size" variant="top" src={movieData.ImagePath} />
        </span>
        <Card.Body className="card-space">
          <Card.Title className="cent" >{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description.slice(0, 90)} ...'</Card.Text>
          <div className="cent">
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="info">Show More</Button>
          </Link>
          </div>
        </Card.Body>
      </Card>
      //Here
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