const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    builds: [{
        unit_name: String, 
        image: String
    }]
});

const model = mongoose.model('ProfileModel', profileSchema);

module.exports = model;