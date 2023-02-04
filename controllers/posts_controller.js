const Post = require('../models/post');
const db = require('../config/mongoose');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {
  try {


    await Post.create({
      content: req.body.content,
      user: req.user._id,

    });

    req.flash('success', 'post published!')
    return res.redirect('back');
  } catch (error) {
    req.flash('error', error);
    return res.redirect('back');
  }
}

// deleting post
// module.exports.destroy = function(req, res){
//   Post.findById(req.params.id, function(err, post){
//     // .id means converting the object id into string
//     if(post.user == req.user.id){
//         post.remove();
//       Comment.deleteMany({post:req.params.id}, function(err){
//         return res.redirect('back');
//       })
//     }else{
//       return res.redirect('back');
//     }
//   })
// }

// deleting post
// Converting into async
module.exports.destroy = async function (req, res) {
  try {


    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      req.flash('success', 'Post and associated comments deleted!');
      return res.redirect('back');
    } else {
      req.flash('error', 'You cannot delete this post!');
      return res.redirect('back');
    }

  } catch (error) {
    console.log('Error', error);
    return res.redirect('back');
  }
}