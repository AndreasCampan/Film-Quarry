import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import "./director-view.scss"

export class DirectorView extends React.Component {
  render() {
    const { directorData, onBackClick } = this.props;

    return (

      <div className="director-view">
        <div className="my-2">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{directorData.Name}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Biography: </span>
          <span className="value">{directorData.Bio}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Born: </span>
          <span className="value">{directorData.Born}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Death: </span>
          <span className="value">{directorData.Died}</span>
        </div>
          <Button variant="info" className="my-3" onClick={()=>onBackClick()}>Back</Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  directorData: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Born: PropTypes.string.isRequired,
      Died: PropTypes.string.isRequired
  }).isRequired
};