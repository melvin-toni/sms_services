const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SCHEMA = new mongoose.Schema({
    name: String,
    width: Number,
    height: Number,
    depth: Number,
    net_weight: Number,
    position: [{
        type: String, 
        enum: ['Horizontal', 'Vertical']
    }],
    psu_form_factor: {
        type: Schema.Types.ObjectId,
        ref: 'PsuFormFactor'
    },
    case_form_factor: {
        type: Schema.Types.ObjectId,
        ref: 'CaseFormFactor'
    },
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: 'Manufacturer'
    },
    expansion_slot: Number,
    gpu_max_dimension: Schema.Types.Mixed,
    rating: { 
        type: Number, 
        min: 1,
        max: 5 
    },
    link: String,
    price: Number,
    images: [String]
}, { timestamps: true });


module.exports = mongoose.model('Case', SCHEMA);