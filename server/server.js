'use strict';

require('dotenv').config()
const mongoose = require('mongoose');

const { MONGO_DB_URI, PORT } = process.env

mongoose.connect(MONGO_DB_URI, {});
const db = mongoose.connection;

db.once('open', async () => {

    const setupExpress = require('./src/configs/express');
    await setupExpress();

    console.log('Connected to db');
    console.log('Application started on port', PORT || 3030);
});

db.on('error', err => {
    console.log('Error while connecting to DB', err);
});