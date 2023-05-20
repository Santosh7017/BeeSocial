// const User = require('../models/user');
// const Friendship = require('../models/friendship');

// module.exports.toggleUser = async function(req, res){
//     try {
//         let toggledUser = await User.findById(req.query.userID).populate('friendships');
//         let otherUser = await User.findById(req.user._id).populate('friendships');

//         // if there is a user to add 
//         if(toggledUser){
//             let freindship_p1 = await Friendship.findOne({
//                 from_user: req.user._id,
//                 to_user: req.query.userID
//             });

//             let friendship_p2 = await Friendship.findOne({
//                 from_user: req.query.userID,
//                 to_user: req.user._id
//             })
//             let friendship = null;

//             if(freindship_p1){
//                 await toggledUser.friendships.pull(freindship_p1._id);
//                 await toggledUser.save();
//                 await otherUser.friendships.pull(freindship_p1);
//                 await otherUser.save();
//                 await freindship_p1.remove();
//             }
//             else if(friendship_p2){
//                 await toggledUser.friendships.pull(friendship_p2._id);
//                 await toggledUser.save();
//                 await otherUser.friendships.pull(friendship_p2);
//                 await otherUser.save();
//                 await friendship_p2.remove();

//             }else {
//                 let newFriendship = await Friendship.create({
//                     from_user: req.user._id,
//                     to_user: req.query.userId
//                 });

//                 toggledUser.friendships.push(newFriendship);
//                  otherUser.friendships.push(newFriendship);
//                  toggledUser.save();
//                 otherUser.save();
//                 friendship = true;
//             }

//             return res.json(200, {
//                 message: "Request Successful !",
//                 data : {
//                     friendshipStatus: friendship
//                 }
//             })
       



//         }
        
//     } catch (error) {
//        if(error){
//               console.log("Error in toggling friendship", error);
//               return res.json(500, {
//                 message: "Internal Server Error"
//               });

//        }
//     }
// }


const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleUser = async function(req , res){

    try {

        let toggledUser = await User.findById(req.query.userId).populate('friendships');
        let ourUser = await User.findById(req.user._id).populate('friendships'); 

        //if there is a user who we wwish o be befrend 
        if(toggledUser){

            let friendship_op1 = await Friendship.findOne({
                from_user : req.user._id,
                to_user : req.query.userId
            })

            let friendship_op2 = await Friendship.findOne({
                from_user : req.query.userId ,
                to_user :  req.user._id
            })

            let friendshipStatus = false;

            if(friendship_op1){

                //we remove the friedship from both of their arrays of frinds
                await toggledUser.friendships.pull(friendship_op1._id);
                await toggledUser.save();
                await ourUser.friendships.pull(friendship_op1._id);
                await ourUser.save();
                await friendship_op1.remove();


            }else if(friendship_op2){

                await toggledUser.friendships.pull(friendship_op2._id);
                await toggledUser.save();
                await ourUser.friendships.pull(friendship_op2._id);
                await ourUser.save();
                await friendship_op2.remove();

            } else{

                let newFriendship = await Friendship.create({
                    from_user : req.user._id,
                    to_user :  req.query.userId
                });

                toggledUser.friendships.push(newFriendship._id);
                ourUser.friendships.push(newFriendship._id);

                toggledUser.save();
                ourUser.save();
                friendshipStatus = true;


            }
            return res.json(200 , {
                message : "Request Sucessfull !" ,
                data  : {
                   friendshipStatus : friendshipStatus
                }
            })

        }
      
        
    } catch (err) {
        console.log(err);
        console.log("Error Toggling Fried")
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
    

}