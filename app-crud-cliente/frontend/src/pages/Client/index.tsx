import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { FiX } from "react-icons/fi";

import "./styles.css";
Modal.setAppElement("#root");

// API - UFS
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/

// Municipios por UF
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

// API - Ceps
// https://viacep.com.br/ws/11671490/json/

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

const initialClient = {
  name: "",
  cpf: "",
  rg: "",
  orgao: "",
  cep: "",
  address: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  uf: "",
  terms: false,
};

const Client = () => {
  const [ufs, setUfs] = useState([]);
  const [currentCep, setCurrentCep] = useState("");
  const [client, setClient] = useState(initialClient);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getUfs = async () => {
      const allUfs = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
      );

      const ordenedUfs = allUfs.data.sort((a: any, b: any) =>
        a.sigla < b.sigla ? -1 : a.sigla > b.sigla ? 1 : 0
      );

      const filteredUfs = ordenedUfs.map((uf: any) => {
        return {
          id: uf.id,
          sigla: uf.sigla,
        };
      });

      setUfs(filteredUfs);
      const newClient = { ...client, uf: filteredUfs[0].sigla };
      setClient(newClient);
    };

    getUfs();
  }, []);

  const clearForm = () => {
    setClient(initialClient);
    setCurrentCep("");
  };

  const handleClose = () => {
    setOpenModal(false);
    clearForm();
  };

  const handleCepChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cep = event.target.value;
    const URI = `https://viacep.com.br/ws/${cep}/json/`;
    setCurrentCep(cep);

    const emptyAddress = {
      uf: "",
      city: "",
      address: "",
      district: "",
    };

    try {
      const data = await axios.get(URI);
      const address = data.data;

      if (address.erro === true) {
        const newClient = { ...client, ...emptyAddress };
        setClient(newClient);
        return;
      }

      const currentAddress = {
        uf: address.uf,
        city: address.localidade,
        address: address.logradouro,
        district: address.bairro,
        cep: address.cep,
      };

      const newClient = { ...client, ...currentAddress };
      setClient(newClient);
    } catch (err) {
      const newClient = { ...client, ...emptyAddress };
      setClient(newClient);

      console.log(err.message);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClient = { ...client, [e.target.name]: e.target.value };
    console.log(newClient);

    setClient(newClient);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newClient = { ...client, [e.target.name]: e.target.value };
    // console.log(newClient);

    if (e.target.name === "cep") setCurrentCep(e.target.value);
    setClient(newClient);
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newClient = { ...client, terms: !client.terms };
    console.log(newClient);

    setClient(newClient);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <div id="client" className="container">
      <div className="client-container">
        <div className="client-header">
          <h2>Cadastro de Cliente</h2>
        </div>
        <hr />

        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="formGridFullName">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome completo..."
                name="name"
                onChange={handleInputChange}
                value={client.name}
              />
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="formGridCpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="somente números"
                name="cpf"
                onChange={handleInputChange}
                value={client.cpf}
              />
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="formGridRg">
              <Form.Label>RG</Form.Label>
              <Form.Control
                type="text"
                placeholder="somente números"
                name="rg"
                onChange={handleInputChange}
                value={client.rg}
              />
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="formGridRg">
              <Form.Label>Órgão Emissor</Form.Label>
              <Form.Control
                type="text"
                name="orgao"
                onChange={handleInputChange}
                value={client.orgao}
              />
            </Form.Group>
          </Form.Row>

          <br />
          <br />

          <Form.Row>
            <Form.Group as={Col} xs={2} controlId="formGridCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                name="cep"
                type="text"
                placeholder="00000-000"
                onBlur={handleCepChange}
                value={currentCep}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group as={Col} xs={5} controlId="formGridAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="address"
                onChange={handleInputChange}
                value={client.address}
              />
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="formGridAddressNumber">
              <Form.Label>N.</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                name="number"
                onChange={handleInputChange}
                value={client.number}
              />
            </Form.Group>

            <Form.Group as={Col} xs={3} controlId="formGridAddressComplement">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="complement"
                onChange={handleInputChange}
                value={client.complement}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridDistrict">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                name="district"
                onChange={handleInputChange}
                value={client.district}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                name="city"
                onChange={handleInputChange}
                value={client.city}
              />
            </Form.Group>

            <Form.Group as={Col} xs={1} controlId="formGridState">
              <Form.Label>UF</Form.Label>
              <Form.Control
                name="uf"
                as="select"
                value={client.uf}
                onChange={handleSelectChange}
              >
                {ufs.map((uf: any) => {
                  return (
                    <option value={uf.sigla} key={uf.id}>
                      {uf.sigla}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          {/* </fieldset> */}

          {/* <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row> */}

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Aceito os termos de serviço."
              name="terms"
              checked={client.terms}
              onChange={handleCheckChange}
            />
          </Form.Group>

          <Button
            size="lg"
            variant="primary"
            name="submit"
            type="submit"
            onClick={handleClick}
          >
            Salvar Dados
          </Button>
        </Form>
      </div>

      {openModal && (
        <Modal isOpen={true} style={customStyles} contentLabel="Example Modal">
          <div className="modal-header">
            <h4>Cliente salvo!</h4>
            <Button variant="danger" onClick={handleClose}>
              <FiX />
            </Button>
          </div>

          <div>Cliente salvo, teste</div>
        </Modal>
      )}
    </div>
  );
};

export default Client;
