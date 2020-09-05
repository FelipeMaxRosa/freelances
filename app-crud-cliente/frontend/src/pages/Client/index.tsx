import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button, Form, Col } from "react-bootstrap";
import { FiX } from "react-icons/fi";

import "./styles.css";
Modal.setAppElement("#root");

interface ClientProps {
  onClose: any;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "1020px",
    height: "600px",
    boxShadow: "5px 5px 10px gray",
  },
};

const Client: React.SFC<ClientProps> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  // const hanbleKeyUp = (event) => {
  //   console.log(event.target);
  // };

  return (
    <div>
      <Modal isOpen={true} style={customStyles} contentLabel="Example Modal">
        <div className="client-header">
          <h2>Cadastro de Cliente</h2>
          <Button variant="danger" onClick={handleClose}>
            <FiX />
          </Button>
        </div>
        <hr />

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Aceito os termos de serviço." />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Client;
