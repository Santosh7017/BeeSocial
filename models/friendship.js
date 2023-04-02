const mongoose = require('mongoose');

const freindshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the user who accept this request, the users won't see a difference 
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', freindshipSchema);
module.exports = Friendship;