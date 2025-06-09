// Загрузка товаров в корзину
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста</p>';
        return;
    }

    let totalSum = 0;

    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-block">
                <span class="price">$${product.price}</span>
                <div class="quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span id="quantity-${index}">${product.quantity || 1}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <span class="total-price">Итог: $${(product.price * (product.quantity || 1)).toFixed(2)}</span>
                <button class="remove" onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `;
        cartContainer.appendChild(productElement);
        totalSum += product.price * (product.quantity || 1);
    });

    // Добавляем информацию о сумме
    const totalSumElement = document.createElement('div');
    totalSumElement.classList.add('total-sum');
    totalSumElement.innerHTML = `<strong>Общая сумма: $${totalSum.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalSumElement);
}

// Обновление количества товара в корзине
function updateQuantity(index, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart[index];
    if (!product) return;

    product.quantity = product.quantity || 1;
    product.quantity += delta;

    if (product.quantity < 1) {
        product.quantity = 1; // Минимальное количество товара — 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Удаление товара из корзины
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Удаляем товар по индексу
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Загрузка корзины при загрузке страницы
loadCart();
