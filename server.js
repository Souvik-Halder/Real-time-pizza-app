const express =require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const PORT=process.env.PORT || 3000;
const expresslayout=require('express-ejs-layouts');

//Assests 

app.use(express.static('public'));

//set template engine
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('home');
    });
    
    app.get('/cart',(req,res)=>{
        res.render('customer/cart');
    })
    
    app.get('/login',(req,res)=>{
        res.render('auth/login')
    })
    app.get('/register',(req,res)=>{
        res.render('auth/register')
    })
app.listen(PORT,()=>{
    console.log(`Listening on the port ${PORT}`);
})