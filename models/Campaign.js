const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SCHEMA = new mongoose.Schema({
    recipients: [{
        _id: {
            type: Schema.Types.ObjectId, ref: 'Recipient', required: true
        },
        status: {
            type: Boolean, default: false
        }
    }],
    message: {
        type: String, required: true
    },
    start: {
        time: {type: Date, required: true},
        offset: {type: Number, required: true}
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', SCHEMA);