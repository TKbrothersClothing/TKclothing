
const logos=["Gold TK","Sport TK","Line TK"]

const items=[
["Hoodie",18],
["Joggers",18],
["Cargos",14.99],
["Tank Top",8],
["Leggings",12],
["Tracksuit Bottoms",15],
["Tracksuit Jumpers",18],
["Tracksuit Zip Ups",18],
["Socks Pack",6],
["Shorts",8],
["Boxers Pack",6],
["Tops",9.99],
["Jeans",15],
["Cropped Tops",9.99],
["Cropped Jackets",12.99],
["Hats",12],
["Beanies",12]
]

let products=[]

items.forEach(item=>{
logos.forEach(logo=>{
products.push({
name:item[0]+" - "+logo,
price:item[1]
})
})
})

function renderProducts(){
const grid=document.getElementById("products")

products.forEach(p=>{
grid.innerHTML+=`
<div class="product">
<h3>${p.name}</h3>
<div class="price">£${p.price}</div>

<select>
<option>S</option>
<option>M</option>
<option>L</option>
<option>XL</option>
</select>

<br>

<button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
<a href="product.html" class="btn">View</a>
</div>
`
})
}
