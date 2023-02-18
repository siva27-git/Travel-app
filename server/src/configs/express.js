'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { PORT } = process.env;

const apiRouter = require('../routes/routes')

module.exports = async () => {

  const app = express();
  app.use(bodyParser.json({}));
  app.use(cors())

  app.use('/travelopia', (req, res, next) => next(), apiRouter);

  app.listen(PORT || 3030);

  return app;
};
