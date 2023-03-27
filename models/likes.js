const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    // this defines the onject id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: "onModel",
    },
    // this field is used for defining the type of the liked object since this is dynamic reference

    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"],
    },
}, {
    timestamp: true
});
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;

