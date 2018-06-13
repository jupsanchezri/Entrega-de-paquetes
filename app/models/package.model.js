const mongoose = require('mongoose');
const PackageSchema = mongoose.Schema({
    fromPersonName: {
        type: String,
        index: true,
        required: true,
        trim: true,
        minlength: 4
    },
    toPersonName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    toAddress: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    packageImage: {
        data: Buffer,
        contentType: String
    },
    weight: String,
    dimention: String,
    notifications: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Registry' 
    }],
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Package', PackageSchema);