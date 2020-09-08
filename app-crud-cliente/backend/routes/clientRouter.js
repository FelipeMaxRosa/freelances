const express = require("express");

const clientRoutes = express.Router();

const clientController = require("../controllers/clientController");

clientRoutes.get("/", clientController.findAll);
clientRoutes.get("/:id", clientController.findOne);
clientRoutes.post("/", clientController.create);
clientRoutes.put("/:id", clientController.update);
clientRoutes.delete("/:id", clientController.remove);
clientRoutes.delete("/", clientController.removeAll);

// export { app as clientRouter };
module.exports = clientRoutes;
