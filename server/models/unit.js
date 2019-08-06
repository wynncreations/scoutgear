var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var UnitSchema = new Schema({
    unit_type: {
        type: String,
        unique: false,
        required: true
    },
    unit_number:{
        type: Number,
        required: true,
    },
    council: {
        type: String,
        unique: false,
        required: true
    },
    district: {
        type: String,
        unique: false,
        required: true
    },
    address1: {
        type: String,
        unique: false,
        required: true
    },
    address2: {
        type: String,
        unique: false,
        required: false
    },
    city: {
        type: String,
        unique: false,
        required: true
    },
    state: {
        type: String,
        unique: false,
        required: true
    },
    zip: {
        type: Number,
        unique: false,
        required: true
    },
    phone: {
        type: String,
        unique: false,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date
});

// Compile model from schema
var UnitModel = mongoose.model('Unit', UnitSchema);

module.exports = UnitModel;