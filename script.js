// إنشاء المنتجات
const products = [];
for(let i=1;i<=20;i++){
    products.push({
        id:i,
        name:{ar:`منتوج ${i}`, en:`Product ${i}`},
        desc:{ar:`وصف المنتج ${i}`, en:`Description for product ${i}`},
        img:`https://via.placeholder.com/300x300?text=Product+${i}`,
        oldPrice: Math.floor(Math.random()*500)+100,
        discountPrice: Math.floor(Math.random()*100)+50
    });
}

// العملات واللغة
let currency="MAD", language="ar";
const currencyRates={MAD:1, EUR:0.095};
const productsContainer=document.getElementById('productsContainer');

// عرض المنتجات
function renderProducts(){
    productsContainer.innerHTML='';
    products.forEach(p=>{
        const oldP=(p.oldPrice*currencyRates[currency]).toFixed(2);
        const discP=(p.discountPrice*currencyRates[currency]).toFixed(2);
        const card=document.createElement('div');
        card.className='product-card';
        card.innerHTML=`
            <img src="${p.img}" alt="${p.name[language]}" class="product-img">
            <div class="name">${p.name[language]}</div>
            <div class="price">
                <span class="old-price">${oldP} ${currency}</span>
                <span class="discount-price">${discP} ${currency}</span>
            </div>
        `;
        card.onclick=()=>showModal(p);
        productsContainer.appendChild(card);
    });
}

// باقي JS تبقى كما هو (نافذة المنتج، سلة، WhatsApp، تغيير اللغة والعملات)

// نافذة المنتج
const modal=document.getElementById('productModal');
const modalImg=document.getElementById('modalImg');
const modalName=document.getElementById('modalName');
const modalDesc=document.getElementById('modalDesc');
const modalOldPrice=document.getElementById('modalOldPrice');
const modalDiscountPrice=document.getElementById('modalDiscountPrice');

function showModal(product){
    modal.style.display='flex';
    modalImg.src=product.img;
    modalName.textContent=product.name[language];
    modalDesc.textContent=product.desc[language];
    modalOldPrice.textContent=(product.oldPrice*currencyRates[currency]).toFixed(2)+' '+currency;
    modalDiscountPrice.textContent=(product.discountPrice*currencyRates[currency]).toFixed(2)+' '+currency;
    document.getElementById('orderBtn').onclick=()=>addToCart(product);
}
document.getElementById('closeModal').onclick=()=>modal.style.display='none';

// سلة المشتريات
let cart=[];
const cartModal=document.getElementById('cartModal');
document.getElementById('cartBtn').onclick=()=>cartModal.style.display='flex';
document.getElementById('closeCart').onclick=()=>cartModal.style.display='none';

function addToCart(product){cart.push(product); updateCartUI(); modal.style.display='none';}
function updateCartUI(){
    const cartItems=document.getElementById('cartItems');
    cartItems.innerHTML='';
    cart.forEach((item,idx)=>{
        const li=document.createElement('li');
        li.innerHTML=`${item.name[language]} - ${(item.discountPrice*currencyRates[currency]).toFixed(2)} ${currency} <button onclick="removeFromCart(${idx})">❌</button>`;
        cartItems.appendChild(li);
    });
    document.getElementById('cartCount').textContent=cart.length;
}
function removeFromCart(idx){cart.splice(idx,1); updateCartUI();}

// WhatsApp
document.getElementById('orderWhatsApp').onclick=()=>{
    let text=`طلب من NOUVA SHOP:%0A`;
    cart.forEach((item,idx)=>{text+=`${idx+1}- ${item.name[language]} - ${(item.discountPrice*currencyRates[currency]).toFixed(2)} ${currency}%0A`;});
    text+=`%0Aالاسم:%0Aالمدينة والحي:%0Aالهاتف:%0A`;
    window.open(`https://wa.me/212623999334?text=${text}`,'_blank');
}

// تغيير اللغة
document.getElementById('languageToggle').onclick=()=>{
    language=language==='ar'?'en':'ar';
    document.getElementById('languageToggle').textContent=language==='ar'?'English':'العربية';
    renderProducts(); updateCartUI();
}

// تغيير العملة
document.getElementById('currencyToggle').onclick=()=>{
    currency=currency==='MAD'?'EUR':'MAD';
    document.getElementById('currencyToggle').textContent=currency;
    renderProducts(); updateCartUI();
}

// أول عرض
renderProducts();
