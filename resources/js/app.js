//client side code will be written here
import axios from 'axios';

let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter');
function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res);
        cartCounter.innerText=res.data.totalQty;
        // console.log(cartCounter);
    })
}

addToCart.forEach(btn => {
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza);
       updateCart(pizza);
    })
 
});