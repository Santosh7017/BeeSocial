const Post = require("../models/post");
const User = require("../models/user");
// module.exports.actionName = function(req, res){};

module.exports.home = async function (req, res) {
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

    //  tells the server that code contains asynchronous statements you need to wait with each asynchronous statement which have been marked ones one get executed then move to the next statement
    try {
        let posts = await Post.find({})
            .sort("-createdAt")
            .populate("user")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                },
                populate:{
                    path: 'user'
                }
            }).populate('likes');
        //  .exec(function(err, posts){

        //     User.find({},function(err, users){
        //         return res.render('home', {
        //             title: "Beesocial | Home",
        //             posts:  posts,
        //             all_users: users
        //         });

        //     });
        //  });

        let users = await User.find({});
        return res.render("home", {
            title: "Beesocial | Home",
            posts: posts,
            all_users: users,
        });
    } catch (error) {
        console.log("Error", error);
    }
};

// this is using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec(function());
// posts.then();

//todo display notifications -noty
//todo add/delet comments -> ajax
