const { model } = require('mongoose');
const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { query } = require('express');

module.exports.toggleLike = async function(req,res){
    try{
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('like');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exists or not
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id

        });

        // if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted: true

        }else{
            // make a new like
            let newLike = await Like.create({
                user: req.user.req._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message: "Request succesfull",
            data:{
                deleted: deleted
            }
        })
    }catch(err){
        console.log(err);
        return res.json(500, {
            message:'Internal Server error'
        });
    }
}