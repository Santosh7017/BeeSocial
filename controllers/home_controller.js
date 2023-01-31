const Post = require('../models/post');
const User = require('../models/user');
// module.exports.actionName = function(req, res){};

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for beesocial</h1>');

    // printing values of cookies
    // console.log(req.cookies);

    // altering the value of cookie
    // res.cookie('user_id',25);


    // Post.find({},function(err, posts){
    //     return res.render('home',{
    //         title:'BeeSocial | home',
    //         posts: posts
    // });
   
    // });
        //  Populating the user of each posts
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments'
//     })
//     .exec(function(err,posts){
//         return res.render('home',{
//             title:'BeeSocial | home',
//             posts: posts
//         });
//     });
 // populate the user of each post
 Post.find({})
 .populate('user')
 .populate({
     path: 'comments',
     populate: {
         path: 'user'
     }
 })
 .exec(function(err, posts){

    User.find({},function(err, users){
        return res.render('home', {
            title: "Beesocial | Home",
            posts:  posts,
            all_users: users
        });

    });
 });
}