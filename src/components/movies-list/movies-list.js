import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import './movie-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, userData, user, token, onGetAcc } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{ margin: '1em 0 2em 0' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col sm= {6} md={5} lg={4}  key={m._id}>
        <MovieCard movieData={m} userData={userData} user={user} token={token} onGetAcc={onGetAcc} />
      </Col>
    ))}
  </>
}

export default connect(mapStateToProps)(MoviesList);