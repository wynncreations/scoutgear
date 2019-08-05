var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var InventoryCategorySchema = new Schema({
    Label: {
        type: String,
        unique: true,
        required: true
    }
});

// Compile model from schema
var InventoryCategoryModel = mongoose.model('InventoryCategory', InventoryCategorySchema);

module.exports = InventoryCategoryModel;