//Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Routers
const projectRouter = require("./projectRoutes");
const actionRouter = require("./actionRoutes");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

function errorHandler(error, req, res, next) {
  res.status(500).json(error);
}

//Catchall middleware
server.use("*", (req, res) => {
  res.status(404).json({ message: `No endpoint found` });
});
server.use(errorHandler);

module.exports = server;
