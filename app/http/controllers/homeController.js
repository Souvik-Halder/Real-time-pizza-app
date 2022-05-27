const Menu=require('../../models/menu');

function homeController(){
 //factory functions ->  this functions return the object
 return{
    // index : function(){
         
    // } this is the same thing as lower
    async index (req,res){
         //We can write the whole logic here...
       const pizzas=await Menu.find();
       console.log(pizzas);
       return res.render('home',{pizzas:pizzas})

     }
 }
}

module.exports=homeController;