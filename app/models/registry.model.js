const mongoose = require('mongoose');
const RegistrySchema = mongoose.Schema({
    packageID: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    location: { 
        type: { type:String },
        coordinates: [Number]
    },
    isClosed: { 
        type: Boolean, 
        default: false 
    },
    desciption: String,
    state: String
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Registry', RegistrySchema);