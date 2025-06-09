const productsKey = 'products';

// Загрузка товаров из localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem(productsKey)) || [];
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="addToClientSite(${product.id})"/>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
            <button onclick="deleteProduct(${product.id})">Удалить товар</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Добавление товара
document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price').value);

    const imageFile = document.getElementById('image-file').files[0];
    const imageURL = document.getElementById('image-url').value;

    let image = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const products = JSON.parse(localStorage.getItem(productsKey)) || [];
            const newProduct = {
                id: products.length ? products[products.length - 1].id + 1 : 1,
                name,
                description,
                price,
                image: e.target.result
            };
            products.push(newProduct);
            localStorage.setItem(productsKey, JSON.stringify(products));
            loadProducts();
        };
        reader.readAsDataURL(imageFile);
    } else if (imageURL) {
        const products = JSON.parse(localStorage.getItem(productsKey)) || [];
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name,
            description,
            price,
            image: imageURL
        };
        products.push(newProduct);
        localStorage.setItem(productsKey, JSON.stringify(products));
        loadProducts();
    }
});

// Удаление товара
function deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem(productsKey)) || [];
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem(productsKey, JSON.stringify(updatedProducts));
    loadProducts();
}

// Загрузка товаров при загрузке страницы
loadProducts();
