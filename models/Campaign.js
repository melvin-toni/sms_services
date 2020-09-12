const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const now = new Date();

const SCHEMA = new mongoose.Schema({
    recipients: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Recipient', required: true},
        status: {default: false, type: Boolean}
    }],
    message: {type: String, required: true},
    start: {
        time: {type: Date, required: true},
        offset: {default: now.getTimezoneOffset(), type: Number, required: true}
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', SCHEMA);