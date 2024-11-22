const mongoose = require('mongoose');

    const Vehicle = mongoose.model('Vehicle', {
        brand: String,
        model: String,
        year: Number
    })

    
module.exports = Vehicle;