/* ==========================================================
   FreshCart — Main JavaScript
   ========================================================== */

const PRODUCTS = [
  { id: 0, name: "Red Apples", category: "Fresh Produce", price: "₹149 / kg", priceNum: 149, image: "images/product-red-apples.jpg", tag: "Fresh Pick" },
  { id: 1, name: "Green Apples", category: "Fresh Produce", price: "₹169 / kg", priceNum: 169, image: "images/product-green-apples.jpg", tag: "Crisp" },
  { id: 2, name: "Carrots", category: "Fresh Produce", price: "₹59 / kg", priceNum: 59, image: "images/product-carrots.jpg", tag: "Farm Fresh" },
  { id: 3, name: "Broccoli", category: "Fresh Produce", price: "₹89 / 500 g", priceNum: 89, image: "images/product-broccoli.jpg", tag: "Fresh" },
  { id: 4, name: "Mixed Vegetables", category: "Fresh Produce", price: "₹129 / pack", priceNum: 129, image: "images/product-mixed-vegetables.jpg", tag: "Healthy" },
  { id: 5, name: "Baby Carrots", category: "Fresh Produce", price: "₹69 / 500 g", priceNum: 69, image: "images/product-baby-carrots.jpg", tag: "Daily Pick" },
  { id: 6, name: "Fresh Zucchini", category: "Fresh Produce", price: "₹99 / 500 g", priceNum: 99, image: "images/product-fresh-zucchini.jpg", tag: "New" },
  { id: 7, name: "Farm Milk", category: "Dairy & Eggs", price: "₹62 / litre", priceNum: 62, image: "images/product-farm-milk.jpg", tag: "Fresh" },
  { id: 8, name: "Almond Milk", category: "Dairy & Eggs", price: "₹169 / litre", priceNum: 169, image: "images/product-almond-milk.jpg", tag: "Plant Based" },
  { id: 9, name: "Fresh Milk & Eggs", category: "Dairy & Eggs", price: "₹118 / pack", priceNum: 118, image: "images/product-fresh-milk-eggs.jpg", tag: "Breakfast" },
  { id: 10, name: "Greek Yogurt", category: "Dairy & Eggs", price: "₹95 / 400 g", priceNum: 95, image: "images/product-greek-yogurt.jpg", tag: "Protein" },
  { id: 11, name: "Fruit Yogurt Bowl", category: "Dairy & Eggs", price: "₹125 / bowl", priceNum: 125, image: "images/product-fruit-yogurt-bowl.jpg", tag: "Popular" },
  { id: 12, name: "Sourdough Bread", category: "Bakery", price: "₹129 / loaf", priceNum: 129, image: "images/product-sourdough-bread.jpg", tag: "Baked Today" },
  { id: 13, name: "Multigrain Bread", category: "Bakery", price: "₹89 / loaf", priceNum: 89, image: "images/product-multigrain-bread.jpg", tag: "Healthy" },
  { id: 14, name: "Artisan Bread", category: "Bakery", price: "₹149 / loaf", priceNum: 149, image: "images/product-artisan-bread.jpg", tag: "Fresh Baked" },
  { id: 15, name: "Basmati Rice", category: "Pantry", price: "₹399 / 5 kg", priceNum: 399, image: "images/product-basmati-rice.jpg", tag: "Staple" },
  { id: 16, name: "White Rice", category: "Pantry", price: "₹299 / 5 kg", priceNum: 299, image: "images/product-white-rice.jpg", tag: "Kitchen Pick" },
  { id: 17, name: "Brown Rice", category: "Pantry", price: "₹249 / kg", priceNum: 249, image: "images/product-brown-rice.jpg", tag: "Wholesome" },
  { id: 18, name: "Grocery Essentials", category: "Everyday Essentials", price: "₹299 / basket", priceNum: 299, image: "images/product-grocery-essentials.jpg", tag: "Value" },
  { id: 19, name: "Fresh Orange Juice", category: "Beverages", price: "₹119 / litre", priceNum: 119, image: "images/product-fresh-orange-juice.jpg", tag: "Chilled" },
  { id: 20, name: "Apple Juice", category: "Beverages", price: "₹139 / litre", priceNum: 139, image: "images/product-apple-juice.jpg", tag: "Fresh" },
  { id: 21, name: "Green Smoothie", category: "Beverages", price: "₹149 / 300 ml", priceNum: 149, image: "images/product-green-smoothie.jpg", tag: "Healthy" },
  { id: 22, name: "Mixed Fruit Smoothie", category: "Beverages", price: "₹159 / 300 ml", priceNum: 159, image: "images/product-mixed-fruit-smoothie.jpg", tag: "Popular" },
  { id: 23, name: "Fresh Produce Basket", category: "Fresh Produce", price: "₹499 / basket", priceNum: 499, image: "images/product-fresh-produce-basket.jpg", tag: "Weekly Pick" }
];

const CATEGORIES = [
  { name: "Fresh Produce", desc: "Fruit, vegetables & greens", image: "images/category-produce.jpg" },
  { name: "Dairy & Eggs", desc: "Milk, yogurt & eggs", image: "images/category-dairy.jpg" },
  { name: "Bakery", desc: "Bread, rolls & baked goods", image: "images/category-bakery.jpg" },
  { name: "Pantry", desc: "Rice, grains & staples", image: "images/category-pantry.jpg" },
  { name: "Beverages", desc: "Juices & refreshing drinks", image: "images/category-beverages.jpg" },
  { name: "Everyday Essentials", desc: "Weekly grocery basics", image: "images/category-essentials.jpg" }
];

/* ==========================================================
   CART MANAGEMENT
   ========================================================== */
let cart = JSON.parse(localStorage.getItem("freshcart-cart") || "[]");

function getCartQuantity() {
  return cart.reduce((total, item) => total + item.qty, 0);
}

function addToCart(productId) {
  let existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  localStorage.setItem("freshcart-cart", JSON.stringify(cart));
  updateCartCounters();
  renderCart();
  const prod = PRODUCTS.find(p => p.id === productId);
  toast((prod ? prod.name : "Product") + " added to cart");
}

function buyNow(productId) {
  addToCart(productId);
  openCart();
}

function changeQuantity(productId, delta) {
  let item = cart.find(x => x.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    cart = cart.filter(x => x.id !== productId);
  }
  localStorage.setItem("freshcart-cart", JSON.stringify(cart));
  updateCartCounters();
  renderCart();
}

function updateCartCounters() {
  const count = getCartQuantity();
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

function openCart() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.classList.add("open");
    renderCart();
  }
}

function closeCart() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.classList.remove("open");
  }
}

function renderCart() {
  const body = document.getElementById("cartBody");
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = `
      <div class="empty">Your cart is empty.</div>
      <a class="btn btn-primary" href="products.html" onclick="closeCart()" style="margin-top:12px; width:100%;">
        Shop Products
      </a>
    `;
    return;
  }

  let total = 0;
  const itemsHtml = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id) || PRODUCTS[item.id];
    if (!p) return "";
    const itemTotal = p.priceNum * item.qty;
    total += itemTotal;
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='images/fallback.jpg'">
        <div>
          <strong>${p.name}</strong>
          <div class="muted">${p.price}</div>
          <div class="quantity">
            <button onclick="changeQuantity(${p.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQuantity(${p.id}, 1)">+</button>
          </div>
        </div>
        <strong>₹${itemTotal.toLocaleString("en-IN")}</strong>
      </div>
    `;
  }).join("");

  body.innerHTML = itemsHtml + `
    <div class="cart-total">
      <span>Estimated Total</span>
      <span>₹${total.toLocaleString("en-IN")}</span>
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="toast('Proceeding to Checkout...'); closeCart();">
      Continue to Checkout
    </button>
  `;
}

/* ==========================================================
   TOAST NOTIFICATIONS
   ========================================================== */
function toast(message) {
  let element = document.getElementById("toast");
  if (!element) {
    element = document.createElement("div");
    element.id = "toast";
    element.className = "toast";
    document.body.appendChild(element);
  }
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(element._timer);
  element._timer = setTimeout(() => {
    element.classList.remove("show");
  }, 2200);
}

/* ==========================================================
   MOBILE MENU
   ========================================================== */
function toggleMobile() {
  document.getElementById("mobileMenu")?.classList.toggle("open");
}

function closeMobile() {
  document.getElementById("mobileMenu")?.classList.remove("open");
}

/* ==========================================================
   SCROLL TO TOP
   ========================================================== */
window.addEventListener("scroll", () => {
  const top = document.getElementById("backTop");
  if (top) {
    top.classList.toggle("show", window.scrollY > 450);
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================================
   INITIALIZE ON DOM LOAD
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounters();
  
  // Close cart when clicking outside box
  const cartModal = document.getElementById("cartModal");
  if (cartModal) {
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) closeCart();
    });
  }

  // Support legacy hash redirection
  if (window.location.hash) {
    const hash = window.location.hash.replace("#/", "").replace("#", "").split("?")[0];
    if (hash && hash !== "home" && !window.location.pathname.endsWith(hash + ".html")) {
      const allowedPages = ["products", "categories", "offers", "delivery", "about", "contact", "login", "dashboard"];
      if (allowedPages.includes(hash)) {
        window.location.href = hash + ".html";
      }
    }
  }

  // Enhance arrow micro-interactions on buttons and links
  document.querySelectorAll(".btn, .green-link").forEach(el => {
    if (el.innerHTML.includes("→") && !el.querySelector(".arrow")) {
      el.innerHTML = el.innerHTML.replace("→", '<span class="arrow">→</span>');
    }
    if (el.innerHTML.includes("←") && !el.querySelector(".arrow-back")) {
      el.innerHTML = el.innerHTML.replace("←", '<span class="arrow-back">←</span>');
    }
  });
});
