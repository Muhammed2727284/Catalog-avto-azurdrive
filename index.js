const productsKey = 'products';

// Загрузка товаров для основного сайта
function loadProductsForClient() {
    const products = JSON.parse(localStorage.getItem(productsKey)) || [];
    const mainProductsContainer = document.getElementById('main-products-container');
    mainProductsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}$</p>
            <button onclick="addToCart(${product.id})">Купить</button>
        `;
        mainProductsContainer.appendChild(productElement);
    });
}

// Добавление товара в корзину
function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = JSON.parse(localStorage.getItem(productsKey)) || [];
    const product = products.find(p => p.id === id);

    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Загрузка товаров при загрузке страницы
loadProductsForClient();
