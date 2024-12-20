const { conn } = require('./src/db.js');

const express = require("express");
const router = require("./src/routes/index.js");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports =async (req, res) =>{
  await conn.sync({ force: false });
  server(req, res);
}

