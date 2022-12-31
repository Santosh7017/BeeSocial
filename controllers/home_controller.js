
// module.exports.actionName = function(req, res){};

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for beesocial</h1>');
    return res.render('home',{
        title:'home'
    });
}