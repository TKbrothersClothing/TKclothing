
const TK_LOGOS = {
  signature:{label:"Gold TK", file:"assets/logo-gold.jpeg", collection:"TK Signature"},
  performance:{label:"Sport TK", file:"assets/logo-sport.png", collection:"TK Performance"},
  essentials:{label:"Line TK", file:"assets/logo-line.png", collection:"TK Essentials"}
};

const BASE_ITEMS = [
  {name:"Hoodie",price:18,category:"Streetwear"},
  {name:"Joggers",price:18,category:"Streetwear"},
  {name:"Cargos",price:14.99,category:"Streetwear"},
  {name:"Tank Top",price:8,category:"Performance"},
  {name:"Leggings",price:12,category:"Performance"},
  {name:"Tracksuit Bottoms",price:15,category:"Performance"},
  {name:"Tracksuit Jumpers",price:18,category:"Performance"},
  {name:"Tracksuit Zip Ups",price:18,category:"Performance"},
  {name:"Socks 4 Pack",price:6,category:"Accessories"},
  {name:"Shorts",price:8,category:"Performance"},
  {name:"Boxers 4 Pack",price:6,category:"Accessories"},
  {name:"Tops",price:9.99,category:"Streetwear"},
  {name:"Jeans",price:15,category:"Streetwear"},
  {name:"Cropped Tops",price:9.99,category:"Streetwear"},
  {name:"Cropped Jackets",price:12.99,category:"Streetwear"},
  {name:"Hats",price:12,category:"Accessories"},
  {name:"Beanies",price:12,category:"Accessories"}
];

const COLORS_BY_CATEGORY = {
  Streetwear:["Black","Stone","Grey"],
  Performance:["Black","Graphite","White"],
  Accessories:["Black","Grey","Cream"]
};

const SIZES_BY_CATEGORY = {
  Streetwear:["S","M","L","XL"],
  Performance:["S","M","L","XL"],
  Accessories:["One Size"]
};

const PRODUCTS = [];
BASE_ITEMS.forEach(item=>{
  Object.entries(TK_LOGOS).forEach(([key,logo])=>{
    PRODUCTS.push({
      slug:`${item.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${key}`,
      name:item.name,
      category:item.category,
      price:item.price,
      logoKey:key,
      logoLabel:logo.label,
      collection:logo.collection,
      logoFile:logo.file,
      colors:COLORS_BY_CATEGORY[item.category],
      sizes:SIZES_BY_CATEGORY[item.category],
      description:`${item.name} finished with the ${logo.label} mark for a clean premium TK Clothing look.`
    });
  });
});

function formatPrice(v){
  return `£${Number(v).toFixed(2).replace('.00','')}`;
}

function getProduct(slug){
  return PRODUCTS.find(p=>p.slug===slug);
}

function productCardMarkup(p){
  return `
    <article class="product-card">
      <div class="product-media" data-name="${p.name}">
        <div class="badges">
          <span class="badge gold">${p.collection}</span>
          <span class="badge">${p.category}</span>
        </div>
        <div class="media-logo">
          <img src="${p.logoFile}" alt="${p.logoLabel}">
        </div>
      </div>
      <div class="product-body">
        <div class="product-top">
          <div>
            <h3 class="product-title">${p.name}</h3>
            <div class="product-meta">${p.logoLabel} · ${p.category}</div>
          </div>
          <div class="price">${formatPrice(p.price)}</div>
        </div>
        <div class="option-row">
          <label>Size</label>
          <select class="control size-select">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select>
        </div>
        <div class="option-row">
          <label>Colour</label>
          <select class="control color-select">${p.colors.map(c=>`<option>${c}</option>`).join('')}</select>
        </div>
        <div class="product-actions">
          <button class="btn add-btn" data-slug="${p.slug}">Add to cart</button>
          <a class="btn secondary" href="product.html?slug=${p.slug}">View</a>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(targetId, filterFn=null, limit=null){
  const target = document.getElementById(targetId);
  if(!target) return;
  let list = PRODUCTS.slice();
  if(filterFn) list = list.filter(filterFn);
  if(limit) list = list.slice(0,limit);
  target.innerHTML = list.map(productCardMarkup).join('');
  bindAddButtons(target);
}

function bindAddButtons(root=document){
  root.querySelectorAll('.add-btn').forEach(btn=>{
    btn.onclick = () => {
      const card = btn.closest('.product-card');
      const slug = btn.dataset.slug;
      const product = getProduct(slug);
      const size = card.querySelector('.size-select')?.value || "One Size";
      const color = card.querySelector('.color-select')?.value || "Black";
      addToCart({
        slug,
        name:`${product.name} · ${product.logoLabel}`,
        price:product.price,
        size,
        color
      });
    };
  });
}

function renderProductPage(){
  const mount = document.getElementById('productMount');
  if(!mount) return;
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug') || PRODUCTS[0].slug;
  const p = getProduct(slug) || PRODUCTS[0];
  mount.innerHTML = `
    <div class="product-gallery">
      <div class="media-logo">
        <img src="${p.logoFile}" alt="${p.logoLabel}">
      </div>
    </div>
    <div class="product-info">
      <div class="eyebrow">${p.collection}</div>
      <h1>${p.name}</h1>
      <p>${p.description}</p>
      <div class="price" style="margin:20px 0 10px">${formatPrice(p.price)}</div>

      <div class="option-row">
        <label>Size</label>
        <select class="control" id="detailSize">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select>
      </div>

      <div class="option-row">
        <label>Colour</label>
        <select class="control" id="detailColor">${p.colors.map(c=>`<option>${c}</option>`).join('')}</select>
      </div>

      <div class="product-actions" style="margin-top:18px">
        <button class="btn" id="detailAdd">Add to cart</button>
        <a class="btn secondary" href="shop.html">Back to shop</a>
      </div>

      <div class="spec-list">
        <div class="spec"><span>Logo</span><strong>${p.logoLabel}</strong></div>
        <div class="spec"><span>Category</span><strong>${p.category}</strong></div>
        <div class="spec"><span>Collection</span><strong>${p.collection}</strong></div>
      </div>
    </div>
  `;
  document.getElementById('detailAdd').onclick = ()=>{
    addToCart({
      slug:p.slug,
      name:`${p.name} · ${p.logoLabel}`,
      price:p.price,
      size:document.getElementById('detailSize').value,
      color:document.getElementById('detailColor').value
    });
  };
}

function renderCheckoutSummary(){
  const mount = document.getElementById('checkoutSummary');
  if(!mount) return;
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=>s + i.price, 0);
  if(!cart.length){
    mount.innerHTML = '<div class="summary-item"><span>Your cart is empty.</span><strong>£0</strong></div>';
    return;
  }
  mount.innerHTML = cart.map(i=>`
    <div class="summary-item">
      <span>${i.name}<br><small class="muted">${i.size} · ${i.color}</small></span>
      <strong>${formatPrice(i.price)}</strong>
    </div>
  `).join('') + `
    <div class="summary-item">
      <span>Subtotal</span><strong>${formatPrice(subtotal)}</strong>
    </div>
  `;
}
