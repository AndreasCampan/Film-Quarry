import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navigation } from '../nav/nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isLoaded: false,
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  getMovies(token) {
    axios.get('https://filmquarry.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  changeReg(regStatus) {
    this.setState({
      registered: regStatus
    });
  }

  signOut(signState) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: signState
    });
  }

  loading(){
    setTimeout(() => {
      this.setState({
        isLoaded: true
      })
    }, 1400);
  }

  render() {
    //Object destruction - same as const movies = this.state.movies;
    const { movies, user, registered, isLoaded } = this.state;
    
    if (!user && registered) return (
      <Row>
        <Col md={12}>
        <LoginView regData={Status => this.changeReg(Status)} loggingIn={user => this.onLoggedIn(user)} />
        </Col>
      </Row>
      )

    if (!user && !registered) return <RegistrationView  regData={Status => this.changeReg(Status)}/>; 

   

    if (movies.length === 0 || !isLoaded) return (
    <>
    <Navigation onSignOut={signState => { this.signOut(signState); }} />
    <div className="loading">Loading<span className="spinner"></span></div>
    {this.loading()}
    </>
   
    )
    //movieData is the props to pass to the child as data
    return (
      <Router>
        <Navigation onSignOut={signState => { this.signOut(signState); }} />
        <Row className="main-view justify-content-center">
          <Route exact path="/" render={() => {
            return movies.map(movie => (
              <Col xs={12} sm={6} md={4} lg={4} key={movie._id}>
                <MovieCard movieData={movie} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)}/>
            </Col>
          }} />    
          <Route path="/directors/:name" render={({ match, history }) => {
            return <Col md={8}>
              <DirectorView directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
            </Col>
          }} /> 
          <Route path="/genre/:name" render={({ match, history }) => {
            return <Col md={8}>
              <GenreView genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
            </Col>
          }} /> 
        </Row>
      </Router>
    );
  }
}