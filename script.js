// Product Data
const products = [
    {
        id: 1,
        name: "Silk Jacquard Evening Gown",
        category: "Dresses",
        price: "$5,200",
        description: "Hand-crafted silk jacquard gown with intricate embroidery details and luxurious draping",
        image: "https://images.unsplash.com/photo-1595777707802-5b5f35487199?w=500&h=600&fit=crop"
    },
    {
        id: 2,
        name: "Italian Leather Crossbody",
        category: "Bags",
        price: "$3,400",
        description: "Premium Italian leather with gold hardware and sophisticated craftsmanship",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop"
    },
    {
        id: 3,
        name: "Tailored Wool Blazer",
        category: "Outerwear",
        price: "$2,800",
        description: "Perfectly tailored blazer from the finest Italian wool with bespoke finishing",
        image: "https://images.unsplash.com/photo-1591047990052-14f150e52e35?w=500&h=600&fit=crop"
    },
    {
        id: 4,
        name: "Couture Cocktail Dress",
        category: "Dresses",
        price: "$4,100",
        description: "Elegant cocktail dress featuring delicate lace and refined silk combination",
        image: "https://images.unsplash.com/photo-1595777707802-5b5f35487199?w=500&h=600&fit=crop"
    },
    {
        id: 5,
        name: "Handcrafted Leather Pumps",
        category: "Footwear",
        price: "$1,950",
        description: "Exquisite leather pumps handcrafted by master artisans with exceptional comfort",
        image: "https://images.unsplash.com/photo-1543163521-9733539c338d?w=500&h=600&fit=crop"
    },
    {
        id: 6,
        name: "Cashmere Pashmina Wrap",
        category: "Accessories",
        price: "$1,200",
        description: "Luxurious blend of pure cashmere and pashmina with natural dyes",
        image: "https://images.unsplash.com/photo-1614636912897-cedc8b4e4c91?w=500&h=600&fit=crop"
    }
];

let cartItems = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    loadCartFromStorage();
});

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('mohsenCart', JSON.stringify(cartItems));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('mohsenCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartBadge();
    }
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart('${product.name}', '${product.price}')">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function openCart() {
    window.location.href = 'cart.html';
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function openAccount() {
    window.location.href = 'account.html';
}

function openSearch() {
    window.location.href = 'search.html';
}

function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p style="padding: 2rem; text-align: center; color: #999;">Your cart is empty</p>';
    } else {
        let total = 0;
        const itemsHTML = cartItems.map((item, index) => {
            const price = parseInt(item.price.replace('$', '').replace(',', ''));
            total += price;
            return `
                <div style="padding: 1.2rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="font-weight: 500; margin-bottom: 0.3rem;">${item.name}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="color: var(--accent-color); font-weight: 500;">${item.price}</p>
                        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #999; cursor: pointer; font-size: 0.8rem; text-decoration: underline; margin-top: 0.3rem;">Remove</button>
                    </div>
                </div>
            `;
        }).join('');
        cartItemsDiv.innerHTML = itemsHTML;
        
        // Update total and checkout button
        const totalDiv = document.querySelector('[id="cartModal"] .footer-bottom');
        if (totalDiv) {
            totalDiv.innerHTML = `
                <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <p style="font-size: 1.1rem; margin-bottom: 1.5rem;"><strong>Total: $${total.toLocaleString()}</strong></p>
                    <a href="checkout.html" style="text-decoration: none;">
                        <button class="cta-button" style="width: 100%;">Proceed to Checkout</button>
                    </a>
                </div>
            `;
        }
    }
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (cartItems.length > 0) {
            cartBadge.textContent = cartItems.length;
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

function showNotification(message, productName = '') {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-icon">✓</div>
            <div>
                <div class="notification-title">Item Added</div>
            </div>
        </div>
        <div class="notification-content">
            <p class="notification-text">${message}</p>
        </div>
        <div class="notification-footer"></div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target == modal) {
        closeCart();
    }
}

// Menu Toggle Functions
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.menu-toggle');
    
    if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

function closeMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.menu-toggle');
    
    if (menu && toggle) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.menu-toggle');
    
    if (menu && toggle) {
        if (!toggle.contains(event.target) && !menu.contains(event.target)) {
            closeMenu();
        }
    }
});

// Search functionality
function toggleSearch() {
    const searchQuery = prompt('Search for products:');
    if (searchQuery) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (filteredProducts.length > 0) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
                    <div class="product-info">
                        <p class="product-category">${product.category}</p>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">${product.price}</p>
                        <p class="product-description">${product.description}</p>
                        <button class="add-to-cart" onclick="addToCart('${product.name}', '${product.price}')">Add to Cart</button>
                    </div>
                </div>
            `).join('');
            document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('No products found for: ' + searchQuery);
        }
    }
}

// Header Icon Functions
window.toggleMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
};

window.closeMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.remove('active');
    }
};

window.openCart = function() {
    window.location.href = 'cart.html';
};

window.openAccount = function() {
    window.location.href = 'account.html';
};

window.openSearch = function() {
    window.location.href = 'search.html';
};
