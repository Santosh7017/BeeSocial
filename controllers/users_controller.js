module.exports.profile = function(req, res){
  return  res.end('<h1>User profile</h1>');
};
module.exports.login = function(req,res){
    return res.render('login');
};
module.exports.signup = function(req,res){
  return res.render('signup');
};