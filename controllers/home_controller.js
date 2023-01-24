const Post = require('../models/post');
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
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments'
    })
    .exec(function(err,posts){
        return res.render('home',{
            title:'BeeSocial | home',
            posts: posts
        });
    });
}