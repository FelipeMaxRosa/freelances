import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.css";

interface HomeProps {
  onOpenModal: any;
}

const Home: React.SFC<HomeProps> = ({ onOpenModal }) => {
  return (
    <div className="container">
      <div className="home">
        <header>
          <h1 id="home-title">Empresa XPTO</h1>
        </header>

        <main>
          <div className="home-group-btn">
            <Button
              as={Link}
              to="/cliente"
              id="btn-client"
              className="home-btn"
              variant="primary"
              size="lg"
              // onClick={onOpenModal}
            >
              Cliente
            </Button>{" "}
            <Button
              id="btn-administrator"
              className="home-btn"
              variant="secondary"
              size="lg"
            >
              Colaborador
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
