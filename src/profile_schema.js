const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    builds: [{
        unit: String, 
        image: String
    }]
});

db = mongoose.connection;
var db2 = db.useDb('CorvusBot');
const model = db2.model('ProfileModel', profileSchema, 'UserBuilds');

module.exports = model;