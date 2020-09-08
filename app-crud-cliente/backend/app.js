import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import clientRoutes from "./routes/clientRoutes";

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();

//define o dominio de origem para consumo do servico
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Rota raiz
 */
app.get("/api", (req, res) => {
  res.send({
    message:
      "Bem-vindo à API de clientes. Acesse /clients e siga as orientações.",
  });
});

/**
 * Rotas principais do app
 */
app.use("/api/clients", clientRoutes);

// app.listen(process.env.PORT || 8081, conectDB);

/**
 * Conexão ao Banco de Dados
 */
const { MONGODB } = process.env;

console.log("Iniciando conexão ao MongoDB...");
mongoose.connect(
  MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      // connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once("open", () => {
  // connectedToMongoDB = true;
  console.log("Conectado ao MongoDB");

  /**
   * Definição de porta e
   * inicialização do app
   */
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
