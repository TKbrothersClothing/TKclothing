
let cart=[]

function toggleCart(){
document.getElementById("cart").classList.toggle("open")
}

function addToCart(name,price){
cart.push({name,price})
renderCart()
}

function renderCart(){
let items=document.getElementById("cartItems")
let total=0
items.innerHTML=""

cart.forEach(item=>{
total+=item.price
items.innerHTML+=`<div class="cart-item">${item.name} - £${item.price}</div>`
})

document.getElementById("cartTotal").innerText="Total £"+total.toFixed(2)
}
