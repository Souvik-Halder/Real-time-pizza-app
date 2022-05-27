function authController(){
    //factory functions ->  this functions return the object
    return{
       // index : function(){
            
       // } this is the same thing as lower
        login (req,res){
            //We can write the whole logic here...
            res.render('auth/login');
        },
        register (req,res){
            //We can write the whole logic here...
            res.render('auth/register');
        },
    }
   }
   
   module.exports=authController;