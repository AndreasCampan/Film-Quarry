import React from 'react';
import Button from 'react-bootstrap/Button';

import "./movie-view.scss"
export class MovieView extends React.Component {

  render() {
    const { movieData2, onBackClick } = this.props;

    return (

      <div className="movie-view">
        <div className="movie-poster cent">
          <img className="poster" src={movieData2.ImagePath} />
        </div>
        <div className="movie-title cent my-5">
          <h2>{movieData2.Title}</h2>
        </div>
        <div className="movie-description my-2">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{movieData2.Description}</span>
        </div>
        <div className="movie-genre my-2">
          <span className="label font-weight-bold">Genre: </span>
          <span className="value">{movieData2.Genre.Name}</span>
        </div>
        <div className="movie-director my-2">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{movieData2.Director.Name}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }} variant="info" className="my-3">Back</Button>

      </div>
    );
  }
}