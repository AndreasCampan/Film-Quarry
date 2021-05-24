import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./movie-view.scss"

export class MovieView extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster cent">
          <img className="poster" src={movieData.ImagePath} />
        </div>
        <div className="movie-title cent my-4">
          <h2 className="movie-name">{movieData.Title}</h2>
        </div>
        <div className="my-3">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        <div className="my-3">
          <span className="label font-weight-bold">Genre: </span>
          <span className="value">{movieData.Genre.Name}
          <Link className="link" to={`/genre/${movieData.Genre.Name}`}>
            <span className="link">Show more</span>
          </Link>
          </span>
        </div>
        <div className="my-3">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{movieData.Director.Name}
            <Link className="link" to={`/directors/${movieData.Director.Name}`}>
              <span className="link">Show more</span>
            </Link>
          </span>
        </div>
        <Link to={`/`}>
          <Button variant="info" className="my-3">Back</Button>
        </Link>
      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired  
};