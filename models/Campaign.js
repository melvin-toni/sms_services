const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SCHEMA = new mongoose.Schema({
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipient'
    }],
    message: String,
    status: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Campaign', SCHEMA);