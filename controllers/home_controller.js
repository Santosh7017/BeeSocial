
// module.exports.actionName = function(req, res){};

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for beesocial</h1>');

    // printing values of cookies
    // console.log(req.cookies);

    // altering the value of cookie
    // res.cookie('user_id',25);
    
    return res.render('home',{
        title:'home'
    });
}