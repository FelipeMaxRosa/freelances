import React, { useState } from "react";
import Home from "./pages/Home";

import Client from "./pages/Client";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="App">
      <Home onOpenModal={handleOpenModal} />
      {openModal && <Client />}
    </div>
  );
}

export default App;
