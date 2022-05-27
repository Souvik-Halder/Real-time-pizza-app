const { update } = require("../../../models/menu");

function cartController(){
    //factory functions ->  this functions return the object
    return{
       // index : function(){
            
       // } this is the same thing as lower
        index (req,res){
            //We can write the whole logic here...
            res.render('customer/cart');
        },
        update(req,res){
         
        
//for the first time creating cart and adding basic object structure..
            if (!req.session.cart){
               req.session.cart={
                   items:{},
                   totalQty:0,
                   totalPrice:0
               }
           

            }
let cart=req.session.cart;
            console.log(req.body);
            //check if item does not exist in cart
             if(!cart.items[req.body._id]){
                 cart.items[req.body._id]={
                     items  :req.body,
                     qty:1
                 }
                 cart.totalQty=cart.totalQty+1
                 cart.totalPrice=cart.totalPrice+req.body.price;

            
        }
        else{
            cart.items[req.body._id].qty= cart.items[req.body._id].qty+1;
            cart.totalQty = cart.totalQty+1;
            cart.totalPrice=cart.totalPrice+req.body.price;
        }
        return res.json({totalQty:req.session.cart.totalQty});
    }
   }
}
   
   module.exports=cartController;