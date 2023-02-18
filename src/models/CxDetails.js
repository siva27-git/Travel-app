'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "name": String,
    "email": String,
    "destination": String,
    "headCount": Number,
    "amount": Number,
    "totalAmount": Number,
    "createdBy": String,
    "updatedBy": String
}, {
    collection: 'cx_details',
    timestamps: true
})

module.exports = mongoose.model('CxDetails', schema);
