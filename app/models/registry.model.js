const mongoose = require('mongoose');
const RegistrySchema = mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    location: {
        type: [Number],
        index: '2d'
    },
    isClosed: {
        type: Boolean, 
        default: false 
    },
    description: String,
    state: String
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Registry', RegistrySchema);