var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var KidsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    account_type: String,
    isParent: Boolean,
    created_at: Date,
    updated_at: Date,
    unit_ID: {
        type: mongoose.Schema.Types.ObjectId
    },
    position: {
        type: String,
    },
    age: Number,
    birthday: Date

});

// Compile model from schema
var KidModel = mongoose.model('Kid', KidsSchema);

module.exports = KidModel;