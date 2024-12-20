const express = require("express");
const router = require("./src/routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
const { conn } = require('./src/db.js');

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = async (req, res) => {
    try {
      await conn.sync({ force: false }); // Sincroniza la base de datos
      server(req, res); // Maneja la solicitud con Express
    } catch (error) {
      res.status(500).send("Error al conectar con la base de datos");
    }
  };;
