const nodemailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log('inside new comment mailer', comment); 
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    console.log("this is comment",comment);
    console.log("This is htmlString",htmlString);
    nodemailer.transporter.sendMail({
        from: 'smorya994@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html: htmlString

    },(err, info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });

}