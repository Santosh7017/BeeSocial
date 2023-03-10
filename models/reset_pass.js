const mongoose = require('mongoose');
const user = require('./user');

const resetPassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const ResetPass = mongoose.model('ResetPass', resetPassSchema);
module.exports = ResetPass;