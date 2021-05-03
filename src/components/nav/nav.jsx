import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

import './nav.scss';

export class Navigation extends React.Component {

render() {
  const { onSignOut } = this.props;

  return (
      <Navbar className="font-weight-bold" fixed="top" expand="md" bg="info" variant="dark">
        <Navbar.Brand><span className="navsize1">Film Quarry</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav className="navsize2">
            <Nav.Link className="text-white" href="#">My Favs</Nav.Link>
            <Nav.Link className="text-white mx-1" href="#">Account</Nav.Link>
            <Nav.Link className="text-white" onClick={() => { onSignOut(null); }}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}