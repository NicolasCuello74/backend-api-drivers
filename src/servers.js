const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({ 
origin: ['http://localhost:5173', 'https://frontend-drivers.vercel.app'], 
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
credentials: true, }));

server.use(router);

module.exports = server;
