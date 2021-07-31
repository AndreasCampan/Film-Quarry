import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './nav.scss';

export class Navigation extends React.Component {

render() {
  const { onSignOut, history, user } = this.props;

  return (
    <>
      <Navbar className="font-weight-bold" fixed="top" expand="md" bg="info" variant="dark">
        <div className="left">
          <Nav.Link className="hover navsize1" onClick={() => { history.push(`/movies`); }}>Film Quarry</Nav.Link>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav className="navsize2">
            <Nav.Link className="text-white mx-2" onClick={() => { history.push(`/movies`); }}>
              <span className="hover ani">Movies</span>
            </Nav.Link>

            <Nav.Link className="text-white mx-2" onClick={() => { history.push(`/users/${user.user}`); }}>
              <span className="hover ani">{`${user.user}`}</span>
            </Nav.Link>
            
            <Nav.Link className="text-white mx-2" onClick={() => { onSignOut(null); }}><span className="hover ani">Sign Out</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="margin"></div>
      </>
    );
  }
}

Navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape().isRequired
};
