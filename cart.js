
const TK_CART_KEY = 'tk-clothing-cart';

function getCart(){
  try{
    return JSON.parse(localStorage.getItem(TK_CART_KEY) || '[]');
  }catch(e){
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(TK_CART_KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(item){
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  toggleCart(true);
}

function toggleCart(force){
  const cartEl = document.getElementById('cartDrawer');
  if(!cartEl) return;
  const open = typeof force === 'boolean' ? force : !cartEl.classList.contains('open');
  cartEl.classList.toggle('open', open);
  renderCart();
}

function renderCart(){
  const cart = getCart();
  const list = document.getElementById('cartList');
  const total = document.getElementById('cartTotal');
  const count = document.getElementById('cartCount');
  if(count) count.textContent = cart.length;
  if(!list || !total) return;
  if(!cart.length){
    list.innerHTML = '<div class="cart-item">Your cart is empty.</div>';
    total.textContent = '£0';
    return;
  }
  list.innerHTML = cart.map((item, idx)=>`
    <div class="cart-item">
      <strong>${item.name}</strong>
      <div class="muted">${item.size} · ${item.color}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:8px">
        <span>${'£' + Number(item.price).toFixed(2).replace('.00','')}</span>
        <button onclick="removeCartItem(${idx})">Remove</button>
      </div>
    </div>
  `).join('');
  const subtotal = cart.reduce((s,i)=>s + Number(i.price), 0);
  total.textContent = '£' + subtotal.toFixed(2).replace('.00','');
}

function removeCartItem(index){
  const cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
}

document.addEventListener('DOMContentLoaded', renderCart);
