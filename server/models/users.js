var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    firstname: String,
    lastname: String,
    account_type: String,
    created_at: Date,
    updated_at: Date,
    unit_ID: {
        type: mongoose.Schema.Types.ObjectId
    },
    position:{
        type: String,
    },
    age: Number,
    birthday: Date,
    parentAccount: {
        type: String
    }

});

// Compile model from schema
var UserModel = mongoose.model('User', UserSchema);

module.exports =  UserModel;