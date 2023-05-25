const mongoose = require('mongoose');

const GutsSchema = new mongoose.Schema({
    css: {
        type: String,
        required: true,
    }, 
    code: {
        type: String,
        required: true,
    }
});

module.exports = {
    Gut: mongoose.models.Gut || mongoose.model('Gut', GutsSchema)
};
