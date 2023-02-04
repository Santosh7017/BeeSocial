const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        
    
    // Post.findById(req.body.post,function(err, post){
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user : req.user._id
    //         },function(err, comment){
    //             // handle err
    //             if(err){
    //                 console.log('error in creating comments or post');
    //                 return;
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');
    //         });
    //     }
    // });
    // converted into async
 let post = await Post.findById(req.body.post);
    if(post){
     let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user : req.user._id
        });
        // handle err
        post.comments.push(comment);
        post.save();
        req.flash('success', 'Comment added on the post!');
        res.redirect('/');
    }

} catch (error) {
        console.log('Error', error);
        req.flash('error', 'Comment cannot be added!');
        res.redirect('/');
}

}
// module.exports.destroy = function(req, res){
// Comment.findById(req.params.id,function(err, comment){
//     if(comment.user == req.user.id){
//         let postId = comment.post;
//         comment.remove();
//         Post.findByIdAndUpdate(postId, {
//             $pull: {comments: req.params.id}},
//             function(err, post) {
//                 return res.redirect('back');
//             });
//     }else{
//         return res.redirect('back');
//     }
// });


// }

module.exports.destroy = async function(req, res){
    // Comment.findById(req.params.id, function(err, comment){
    //     if (comment.user == req.user.id){

    //         let postId = comment.post;

    //         comment.remove();

    //         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
    try {
        
    
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id){

        let postId = comment.post;

        comment.remove();

       let post =  Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
       req.flash('success', 'Comment removed from post!');
       return res.redirect('back');
    }else{
        req.flash('error', 'comment cannot be deleted');
        return res.redirect('back');
    }
} catch (error) {
        console.log('Error', error);
}
}