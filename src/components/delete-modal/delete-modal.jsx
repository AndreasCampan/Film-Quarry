import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

export function ConfirmDel(props) {
  const deleteAcc = props.deleteAcc;
  const token = props.token;

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deleting Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account from Film Quarry?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" className="mx-2 px-3" onClick={() => { deleteAcc(token); } }>Yes</Button>
          
          <Button variant="outline-info" className="mx-2 px-3" onClick={props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="info" className="mb-4" onClick={() => {setModalShow(true)}}>
        Delete Account
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

ConfirmDel.propTypes = {
  token: PropTypes.string.isRequired,
  deleteAcc: PropTypes.func.isRequired
};