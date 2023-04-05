const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleUser = async function(req, res){
    try {
        let toggledUser = await User.findById(req.query.userID).populate('friendships');
        let ourUser = await User.findById(req.user._id).populate('friendship');

        // if there is a user to add 
        let friendship_op1 = await Friendship.findOne({
            from_user: req.user._id,
            to_user: req.query.userID
        });

        let friendship_op2 = await Friendship.findOne({
            from_user: req.query.userID,
            to_user: req.user._id
        });
        let friendshipStatus = false;
        if(friendship_op1){
            await toggledUser.friendships.pull(friendship_op1._id);
            await toggledUser.save();
        }
        
    } catch (error) {
       
    }
}