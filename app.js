/* ============================================================
   AURALIS SCENTS — script.js
   Handles: mobile navigation, product data + rendering,
   scroll effects, and the contact CTA.

   TO UPDATE PRODUCTS LATER:
   Just edit the "products" array below. Each product can have:
     name       (string, required)
     size       (string, required)
     stock      (number, optional — omit the field entirely if unknown)
     note       (string, optional — e.g. "Made in Italy")
     photo      (string, optional — path to an image file. Leave
                 out or set to "" to keep showing the placeholder)
     price      (string, optional — e.g. "₱650". Leave out or set
                 to "" to keep showing "Price coming soon")
   ============================================================ */

const products = [
  { name: "Jo Malone London English Pear & Freesia Cologne", size: "9 ml", stock: 2, price: 999, category: "unisex", photo: "images/products/jo-malone-peony.png" },
  { name: "Jo Malone London Peony & Blush Suede Cologne", size: "9 ml", stock: 1, price: 999,category: "women", photo: "images/products/jo-malone-english-pear.png" },
  { name: "Dior J'adore Eau de Parfum", size: "5 ml", stock: 1, price: 999, category: "women", photo: "images/products/jadore-dior.png" },
  { name: "Gucci Flora Gorgeous Gardenia Eau de Parfum", size: "5 ml", stock: 1, price: 999, category: "women", photo: "images/products/gucci-flora.png" },
  { name: "Gucci Bloom Acqua di Fiori Eau de Toilette", size: "5 ml", stock: 2, price: 999, category: "women", photo: "images/products/gucci-bloom-acqua.png" },
  { name: "Gucci Bloom Eau de Parfum", size: "5 ml", stock: 2, price: 999, category: "women", photo: "images/products/gucci-bloom-intense.png" },
  { name: "Maison Margiela REPLICA Lazy Sunday Morning Eau de Toilette", size: "7 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/replica-lazy-sunday-morning.png" },
  { name: "Clinique Happy Eau de Parfum", size: "4 ml", stock: 1, price: 990, category: "women", photo: "images/products/clinique-happy.png" },
  { name: "Chanel Chance", size: "7.5 ml", stock: 3, price: 999, category: "women", photo: "images/products/chance-chanel.png" },
  { name: "Miss Dior Blooming Bouquet Eau de Toilette", size: "5 ml", stock: 2, price: 999, category: "women", photo: "images/products/miss-dior-blooming.png" },
  { name: "Tocca Florence Eau de Parfum", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/tocca-florence.png" },
  { name: "Dolce & Gabbana Light Blue Eau de Toilette", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/dolce-gabbana.png" },
  { name: "Bvlgari Omnia Amethyste Eau de Toilette", size: "5 ml", stock: 2, price: 990, category: "women",photo: "images/products/bvlgari.png" },
  { name: "Byredo Blanche Eau de Parfum", size: "10 ml", stock: 1, price: 990, category: "unisex", photo: "images/products/byredo-blanche.png" },
  { name: "Diptyque Eau Rose Eau de Toilette", size: "10 ml", stock: 3, price: 990, category: "unisex", photo: "images/products/diptyque-eau-rose.png" },
  { name: "Versace Bright Crystal Eau de Toilette", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/versace-bright-crystal.png" },
  { name: "Bleu de Chanel Pour Homme", size: "10 ml", stock: 1, price: 999, category: "men", photo: "images/products/bleu-de-chanel.png" },
  { name: "Creed Aventus Anniversary", size: "15 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/creed-anniv.png" },
  { name: "Creed Aventus", size: "15 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/creed-aventus.png" },
  { name: "Dior Sauvage", size: "10 ml", stock: 1, price: 999, category: "men", photo: "images/products/sauvage-dior.png" },
  { name: "Yves Saint Laurent Y Eau de Toilette Fraîche", size: "7.5 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/ysl.png" },
  { name: "Miu Miu Miutine", size: "7 ml", stock: 2, price: 999, category: "women", photo: "images/products/miu-miu.png" },
  { name: "Eilish by Billie Eilish", size: "7.5 ml", stock: 1, price: 800, category: "women",photo: "images/products/billie-eilish.png" },
  { name: "Eilish No. 2 by Billie Eilish", size: "7.5 ml", stock: 1, price: 800, category: "women", photo: "images/products/billie-eilish-no2.png" },
  { name: "Viktor&Rolf Flowerbomb", size: "7 ml", stock: 1, price: 999, category: "women", photo: "images/products/flowerbomb-vr.png" },
  { name: "Viktor&Rolf Flowerbomb Tiger Lily", size: "7 ml", stock: 1, price: 999, category: "women", photo: "images/products/flowerbomb-tiger-lily.png" },
  { name: "YSL Mon Paris", size: "7.5 ml", stock: 1, price: 999, category: "women", photo: "images/products/ysl-mon-paris.png" },
  { name: "Chloé", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/chloe.png" },
  { name: "Versace Dylan Purple", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/dylan-purple.png"}
];

/* ---------- Render the collection grid ---------- */
let cart = [];
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
}

function addToCart(productName) {
  const product = products.find((p) => p.name === productName);
  if (!product) return;

  const existingItem = cart.find((item) => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  console.log("Cart:", cart);
  const cartCount = document.getElementById("cartCount");

if (cartCount) {
  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  renderCart();
}
}
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">Your cart is empty.</p>
    `;

    cartTotal.textContent = "₱0";
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.size}</p>
        <strong>₱${item.price.toLocaleString()}</strong>
      </div>

      <div class="cart-item-actions">
        <span>Qty: ${item.quantity}</span>

        <button
          type="button"
          class="cart-remove"
          data-product-name="${item.name}"
        >
          Cancel
        </button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  cartTotal.textContent = `₱${total.toLocaleString()}`;
}
function removeFromCart(productName) {
  const existingItem = cart.find((item) => item.name === productName);

  if (!existingItem) return;

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
  } else {
    cart = cart.filter((item) => item.name !== productName);
  }
renderCart();
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  console.log("Cart:", cart);
}
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">Your cart is empty.</p>
    `;

    cartTotal.textContent = "₱0";
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.size}</p>
        <strong>₱${item.price.toLocaleString()}</strong>
      </div>

      <div class="cart-item-actions">
        <span>Qty: ${item.quantity}</span>

        <button
          type="button"
          class="cart-remove"
          data-product-name="${item.name}"
        >
          Cancel
        </button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  cartTotal.textContent = `₱${total.toLocaleString()}`;
}
function renderProducts(items = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = items
    .map((p) => {
      const stockLine =
        typeof p.stock === "number"
          ? `<p class="product-stock">${p.stock} ${p.stock === 1 ? "piece" : "pieces"} left</p>`
          : "";
      const noteLine = p.note ? `<p class="product-note">${p.note}</p>` : "";
      const priceText = p.price ? `₱${p.price}` : "Price coming soon";
      const photoBlock =
        p.photo && p.photo.trim() !== ""
          ? `<img src="${p.photo}" alt="${p.name}" class="product-photo" />`
          : `<div class="product-photo-placeholder">
               <svg viewBox="0 0 64 64" class="bottle-icon" aria-hidden="true">
                 <path d="M27 6h10v7h3a2 2 0 0 1 2 2v4.2c2.4 1.7 4 4.6 4 7.8v27a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V27c0-3.2 1.6-6.1 4-7.8V15a2 2 0 0 1 2-2h3V6z"/>
                 <line x1="24" y1="30" x2="40" y2="30"/>
                 <line x1="24" y1="38" x2="40" y2="38"/>
               </svg>
               <span>Product photo coming soon</span>
             </div>`;

      return `
        <article class="product-card">
          ${photoBlock}
          <div class="product-info">
            <h3 class="product-name">${p.name}</h3>
            <p class="product-size">${p.size}</p>
            ${noteLine}
            ${stockLine}
            <p class="product-price">${priceText}</p>
            <button
  type="button"
  class="btn btn-outline btn-small add-to-cart"
  data-product-name="${p.name}"
>
  Add to Cart
</button>
          </div>
        </article>
      `;
    })
    .join("");
}

/* ---------- Mobile navigation toggle ---------- */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("nav-menu-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the menu automatically once a link is tapped
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("nav-menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Sticky nav shadow on scroll ---------- */
function setupScrollShadow() {
  const nav = document.getElementById("siteNav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 8) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  });
}

/* ---------- Simple copy-to-clipboard for the email address ---------- */
function setupEmailCopy() {
  const emailBtn = document.getElementById("copyEmail");
  if (!emailBtn) return;

  emailBtn.addEventListener("click", () => {
    const email = emailBtn.dataset.email;
    navigator.clipboard
      .writeText(email)
      .then(() => {
        const original = emailBtn.textContent;
        emailBtn.textContent = "Copied!";
        setTimeout(() => {
          emailBtn.textContent = original;
        }, 1800);
      })
      .catch(() => {
        /* Clipboard access can fail silently in some browsers — no action needed */
      });
  });
}
let activeFilter = "all";

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(keyword);
    const matchesCategory =
      activeFilter === "all" || product.category === activeFilter;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}
const searchInput = document.getElementById("searchInput");

function setupSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );

    applyFilters();
  });
}
/* =========================================================
   FAQ — SINGLE OPEN ACCORDION
   ========================================================= */

document.querySelectorAll(".faq-item").forEach((faq) => {
  const summary = faq.querySelector("summary");
  const answer = faq.querySelector("p");

  if (!summary || !answer) return;

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    const isOpen = faq.hasAttribute("open");

    // Close currently open FAQ
    document.querySelectorAll(".faq-item[open]").forEach((openFaq) => {
      if (openFaq !== faq) {
        closeFaq(openFaq);
      }
    });

    // Toggle clicked FAQ
    if (isOpen) {
      closeFaq(faq);
    } else {
      openFaq(faq);
    }
  });
});


function openFaq(faq) {
  const answer = faq.querySelector("p");

  faq.setAttribute("open", "");

  // Start from zero height
  answer.style.maxHeight = "0px";
  answer.style.opacity = "0";
  answer.style.paddingBottom = "0px";

  // Force browser to register the starting state
  requestAnimationFrame(() => {
    answer.style.maxHeight = answer.scrollHeight + "px";
    answer.style.opacity = "1";
    answer.style.paddingBottom = "24px";
  });
}


function closeFaq(faq) {
  const answer = faq.querySelector("p");

  // Start from its current height
  answer.style.maxHeight = answer.scrollHeight + "px";
  answer.style.opacity = "1";

  requestAnimationFrame(() => {
    answer.style.maxHeight = "0px";
    answer.style.opacity = "0";
    answer.style.paddingBottom = "0px";
  });

  // Remove open only after animation finishes
  setTimeout(() => {
    faq.removeAttribute("open");
  }, 300);
}



  // Add to Cart
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".add-to-cart");

    if (!button) return;

    const productName = button.dataset.productName;

    addToCart(productName);
  });
  // Cancel item from cart
document.addEventListener("click", (e) => {
  const button = e.target.closest(".cart-remove");

  if (!button) return;

  const productName = button.dataset.productName;

  removeFromCart(productName);
});
    // Cart open / close
  const cartLink = document.querySelector(".cart-link");
  const cartPanel = document.getElementById("cartPanel");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");

  function openCart() {
    cartPanel?.classList.add("cart-open");
    cartOverlay?.classList.add("cart-open");
  }

  function closeCart() {
    cartPanel?.classList.remove("cart-open");
    cartOverlay?.classList.remove("cart-open");
  }

  cartLink?.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });

  cartClose?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);
  /* =========================================================
   INITIALIZE AURALIS SCENTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupSearch();
  setupFilters();
  setupMobileNav();
  setupScrollShadow();
  setupEmailCopy();
});
// =========================================================
// ORDER FORM
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const cartCheckout = document.getElementById("cartCheckout");
  const orderModal = document.getElementById("orderModal");
  const orderModalClose = document.getElementById("orderModalClose");
  const orderSummary = document.getElementById("orderSummary");
  const orderTotal = document.getElementById("orderTotal");

  function openOrderModal() {
    if (!orderModal) return;

    if (cart.length === 0) {
      alert("Your cart is empty. Please add a fragrance first.");
      return;
    }

    if (orderSummary) {
      orderSummary.innerHTML = cart.map((item) => `
        <div class="order-summary-item">
          <span>
            ${item.name}<br>
            <small>${item.size} × ${item.quantity}</small>
          </span>
          <strong>
            ₱${(item.price * item.quantity).toLocaleString()}
          </strong>
        </div>
      `).join("");
    }

    const total = cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    if (orderTotal) {
      orderTotal.textContent = `₱${total.toLocaleString()}`;
    }

    orderModal.classList.add("order-modal-open");
  }

  function closeOrderModal() {
    if (!orderModal) return;

    orderModal.classList.remove("order-modal-open");
  }

  cartCheckout?.addEventListener("click", openOrderModal);

  orderModalClose?.addEventListener("click", closeOrderModal);

  orderModal?.addEventListener("click", (e) => {
    if (e.target === orderModal) {
      closeOrderModal();
    }
  });

});
// =========================================================
// AURALIS SCENTS - GOOGLE SHEETS
// =========================================================

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbwbJe7maC8k_derp4xfblBQlleL6eW0w4-gsVP8sg1C7TLE0aFuF5qLdb2s1n7oKoKctQ/exec";
  const orderForm = document.getElementById("orderForm");

orderForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = orderForm.querySelector(".order-submit");
  const status = document.getElementById("orderFormStatus");
  const orderSuccess = document.getElementById("orderSuccess");
  const backToCollection = document.getElementById("backToCollection");

  const customerName = document.getElementById("customerName").value.trim();
  const messengerName = document.getElementById("messengerName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const zipCode = document.getElementById("zipCode").value.trim();

  const orderDetails = cart.map((item) => {
    return `${item.name} — ${item.size} × ${item.quantity}`;
  }).join("; ");

  const total = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const data = {
    customerName,
    messengerName,
    phone,
    address,
    orderDetails,
    total,
    zipCode
  };

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
  // Send order to Google Sheets in the background
  fetch(GOOGLE_SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
  }).catch((error) => {
    console.error("Background order submission error:", error);
  });

  // Show success screen immediately
  orderForm.style.display = "none";

  if (orderSuccess) {
    orderSuccess.classList.add("order-success-visible");
  }

  // Clear form
  orderForm.reset();

  // Clear cart
  cart = [];

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  if (typeof renderCart === "function") {
    renderCart();
  }

  // Back to Collection
  backToCollection?.addEventListener("click", () => {
    orderSuccess?.classList.remove("order-success-visible");
    orderForm.style.display = "";

    if (typeof closeOrderModal === "function") {
      closeOrderModal();
    }

    document.getElementById("collection")?.scrollIntoView({
      behavior: "smooth"
    });
  }, { once: true });

} catch (error) {
  console.error("Order submission error:", error);

  if (status) {
    status.textContent = "Something went wrong. Please try again.";
  }

} finally {
  submitButton.disabled = false;
  submitButton.textContent = "Submit Order";
}
});
