// اللغة
const langBtn = document.getElementById('language-toggle');
let lang = 'ar';
langBtn.addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = lang;
    alert(`اللغة تغيرت إلى ${lang === 'ar' ? 'العربية' : 'English'}`);
});

// السلة
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
let cart = [];

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// إضافة منتجات
const products = document.querySelectorAll('.product');
const modal = document.querySelector('.product-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalOriginal = document.getElementById('modal-original');
const modalSale = document.getElementById('modal-sale');
const addToCartBtn = document.querySelector('.add-to-cart');

let selectedProduct = null;

products.forEach(p => {
    p.addEventListener('click', () => {
        selectedProduct = p;
        modal.classList.add('active');
        modalImg.src = p.querySelector('img').src;
        modalName.textContent = p.querySelector('.product-name').textContent;
        modalDesc.textContent = p.dataset.description;
        modalOriginal.textContent = p.dataset.price + ' DH';
        modalSale.textContent = p.dataset.sale + ' DH';
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
});

addToCartBtn.addEventListener('click', () => {
    cart.push({
        name: selectedProduct.querySelector('.product-name').textContent,
        price: selectedProduct.dataset.sale
    });
    updateCart();
    modal.classList.remove('active');
});

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price);
        const div = document.createElement('div');
        div.textContent = `${item.name} - ${item.price} DH`;
        cartItemsContainer.appendChild(div);
    });
    document.getElementById('total-price').textContent = total;
    const phone = '0623999334';
    document.getElementById('whatsapp-order').href = `https://wa.me/${phone}?text=مرحبا! أريد طلب هذه المنتجات: ${cart.map(i => i.name).join(', ')}`;
}

// تغيير العملة
const dhBtn = document.getElementById('dh-btn');
const eurBtn = document.getElementById('eur-btn');
let currency = 'DH';
dhBtn.addEventListener('click', () => changeCurrency('DH', 1));
eurBtn.addEventListener('click', () => changeCurrency('€', 0.1));

function changeCurrency(cur, rate) {
    currency = cur;
    document.querySelectorAll('.product').forEach(p => {
        const price = parseFloat(p.dataset.sale);
        const original = parseFloat(p.dataset.price);
        p.querySelector('.sale').textContent = (price * rate).toFixed(2) + ' ' + cur;
        p.querySelector('.original').textContent = (original * rate).toFixed(2) + ' ' + cur;
    });
    cart.forEach((item, i) => {
        cart[i].price = (parseFloat(item.price) * rate).toFixed(2);
    });
    updateCart();
}
