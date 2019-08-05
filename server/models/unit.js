var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
    unit_type: {
        type: String,
        unique: false,
        required: true
    },
    unit_number:{
        type: Number,
        required: true,
    },
    council: String,
    district: String,
    address1: String,
    address2: String,
    city: String,
    state: Number,
    zip: String,
    phone: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date
});

// Compile model from schema
var InventoryModel = mongoose.model('Inventory', InventorySchema);

module.exports = InventoryModel;