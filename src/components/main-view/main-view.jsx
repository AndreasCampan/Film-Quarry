import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
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
      token: null,
      isLoaded: false,
      isLoaded2: false,
      selectedMovie: null,
      user: null,
      userData: null
    };
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userToken = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')
      });
      this.getAcc(accessToken, userToken);
      this.getMovies(accessToken);
    }
  }

  newUser(newData) {
    localStorage.setItem('user', newData.Username);
    this.setState({
      userData: newData,
      user: newData.Username
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  getAcc(token, user) {
    axios.get(`https://filmquarry.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('Success with getAcc');
      this.setState({
        userData: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
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
      user: authData.user.Username,
      token: authData.token
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getAcc(authData.token, authData.user.Username);
    this.getMovies(authData.token);
  }

  signOut(signState) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: signState,
      token: null,
      userData: null
    });
  }

  loading(){
    setTimeout(() => {
      this.setState({
        isLoaded: true
      })
    }, 1400);
  }

  loading2(){
    setTimeout(() => {
      this.setState({
        isLoaded2: true
      })
    }, 3000);
  }


  render() {
    //Object destruction - same as const movies = this.state.movies;
    const { movies, user, isLoaded, isLoaded2, token, userData } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-center">
          <Route exact path={["/", "/movies"]} render={({ history }) => {
            if (!user) return (
                <Col md={12}>
                  <LoginView loggingIn={user => this.onLoggedIn(user)} />
                </Col>
            )

            if (movies.length === 0 || !isLoaded) return (
              <>
                <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                <div className="loading">Loading<span className="spinner"></span></div>
                {this.loading()}
              </>
            )
              
            if (userData) return (
              <>
                <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                {movies.map(movie => (
                  <Col xs={12} sm={6} md={4} lg={4} key={movie._id}>
                    <MovieCard movieData={movie} userData={userData} user={user} token={token}  onGetAcc={() => { this.getAcc(token, user); }} onSignOut={sgnState => { this.signOut(signState); }}/>
                  </Col>
                ))}
              </>
            )
          }} />

          <Route path="/register" render={() => {
            return <Col>
              <RegistrationView/>
            </Col>
          }} />
          
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return (
              <>
                <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                <Col md={8}>
                  <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onSignOut={signState => { this.signOut(signState); }}/>
                </Col>
                </>
              )
          }} />
           
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return (
              <>
                <Navigation user={user}  history={history} onSignOut={signState => { this.signOut(signState); }} />
                <Col md={8}>
                  <DirectorView directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} onSignOut={signState => { this.signOut(signState); }}/>
                </Col>
                </>
            )
          }} /> 

          <Route path="/genre/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return (
              <>
                <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                <Col md={8}>
                  <GenreView genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} onSignOut={signState => { this.signOut(signState); }}/>
                </Col>
              </>
            )
          }} /> 

          <Route path={`/users/${user}`} render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (!userData && !isLoaded2) {
              return (
                <>
                  <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                  <div className="loading">Loading<span className="spinner"></span></div>
                  {this.loading2()}
                </>
              )
            }
            return (
              <>
                <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                <Col md={8}>
                  <ProfileView user={user} token={token} history={history} userData={userData} onNewUser={newData => { this.newUser(newData); }} onSignOut={signState => { this.signOut(signState); }}/>
                </Col>
                </>
              )
          }} />   

        </Row>
      </Router>
    );
  }
}