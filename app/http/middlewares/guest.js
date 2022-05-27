//when user is logged in then he/she should not go to the register and login page so we will create a middleware

function guest(req,res,next){
    if(!req.isAuthenticated()){
        return next() //next is used for further request process..
    }
    return res.redirect('/');
}
module.exports = guest;