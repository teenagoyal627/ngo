/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Modal } from "react-bootstrap";
import './AcceptCookies.css'
const AcceptCookiesModal = ({ showModal, handleDeny, handleAccept }) => {
  console.log(showModal)
    return (
    <Modal show={showModal} onHide={handleDeny}  className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>We Value Your Privacy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We use cookies to enhance your experience. Do you accept the use of
          cookies to store your user Id and preferences?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeny}>
          Deny
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptCookiesModal;
