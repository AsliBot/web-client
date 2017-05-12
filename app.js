"use strict";

const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const viewRouter = require("./routes/view");
const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || "development";

const initMiddlewares = () => {
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json({
    limit: "5mb"
  }));
  // app.use("/app", authMiddleware);
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
  app.use('/', express.static('public/'));
}

const initRoutes = () => {
  app.use("/web", viewRouter);
};

const startServer = () => {
  server.listen(PORT, function() {
    console.log(`web-client server is running on port ${PORT} in ${ENV} environment`);
  })
};

initMiddlewares();
initRoutes();
startServer();
