const homeController = require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController =require('../app/http/controllers/customers/cartController');
const guest=require('../app/http/middlewares/guest');

function initRoutes(app){
    //To go the login and register we neec to 
        app.get("/",homeController().index);
        app.get('/cart',cartController().index);  
        app.get('/login',authController().login);
        app.get('/register', authController().register)
        app.post('/update-cart',cartController().update);
        app.post('/register',authController().postRegister);
        app.post('/login',authController().postlogin);
        app.post('/logout',authController().logout)
}

module.exports=initRoutes;//This will provide function