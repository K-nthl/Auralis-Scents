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
  { name: "Jo Malone English Pear & Freesia Cologne", size: "9 ml", stock: 2, price: 999, category: "unisex", photo: "images/products/jo-malone-peony.png" },
  { name: "Jo Malone Peony & Blush Suede Cologne", size: "9 ml", stock: 1, price: 999,category: "women", photo: "images/products/jo-malone-english-pear.png" },
  { name: "J'Adore Dior", size: "5 ml", stock: 1, price: 999, category: "women", photo: "images/products/jadore-dior.png" },
  { name: "Gucci Flora Gorgeous Gardenia", size: "5 ml", stock: 1, price: 999, category: "women", photo: "images/products/gucci-flora.png" },
  { name: "Gucci Bloom Acqua di Fiori", size: "5 ml", stock: 2, price: 999, category: "women", photo: "images/products/gucci-bloom-acqua.png" },
  { name: "Gucci Bloom", size: "5 ml", stock: 2, price: 999, category: "women", photo: "images/products/gucci-bloom-intense.png" },
  { name: "Replica Lazy Sunday Morning Maison Margiela", size: "7 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/replica-lazy-sunday-morning.png" },
  { name: "Clinique Happy Parfum Spray", size: "4 ml", stock: 1, price: 990, category: "women", photo: "images/products/clinique-happy.png" },
  { name: "Chance Chanel", size: "7.5 ml", stock: 3, price: 999, category: "women", photo: "images/products/chance-chanel.png" },
  { name: "Miss Dior Blooming Bouquet Dior", size: "5 ml", stock: 2, price: 999, category: "women", photo: "images/products/miss-dior-blooming.png" },
  { name: "Tocca Florence", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/tocca-florence.png" },
  { name: "Dolce & Gabbana Light Blue", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/dolce-gabbana.png" },
  { name: "Bvlgari Omnia Amethyste", size: "5 ml", stock: 2, price: 990, category: "women",photo: "images/products/bvlgari.png" },
  { name: "Byredo Blanche", size: "10 ml", stock: 1, price: 990, category: "unisex", photo: "images/products/byredo-blanche.png" },
  { name: "Diptyque Eau Rose", size: "10 ml", stock: 3, price: 990, category: "unisex", photo: "images/products/diptyque-eau-rose.png" },
  { name: "Versace Bright Crystal", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/versace-bright-crystal.png" },
  { name: "Bleu de Chanel Pour Homme", size: "10 ml", stock: 1, price: 999, category: "men", photo: "images/products/bleu-de-chanel.png" },
  { name: "Creed Anniversary Aventus", size: "15 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/creed-anniv.png" },
  { name: "Creed Aventus", size: "15 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/creed-aventus.png" },
  { name: "Sauvage Dior", size: "10 ml", stock: 1, price: 999, category: "men", photo: "images/products/sauvage-dior.png" },
  { name: "Yves Saint Laurent Eau Fraîche", size: "7.5 ml", stock: 1, price: 999, category: "unisex", photo: "images/products/ysl.png" },
  { name: "Miu Miu Miutine", size: "7 ml", stock: 2, price: 999, category: "women", photo: "images/products/miu-miu.png" },
  { name: "Billie Eilish", size: "7.5 ml", stock: 1, price: 800, category: "women",photo: "images/products/billie-eilish.png" },
  { name: "Billie Eilish No. 2", size: "7.5 ml", stock: 1, price: 800, category: "women", photo: "images/products/billie-eilish-no2.png" },
  { name: "Flowerbomb Viktor&Rolf", size: "7 ml", stock: 1, price: 999, category: "women", photo: "images/products/flowerbomb-vr.png" },
  { name: "Flowerbomb Tiger Lily Viktor&Rolf", size: "7 ml", stock: 1, price: 999, category: "women", photo: "images/products/flowerbomb-tiger-lily.png" },
  { name: "YSL Mon Paris", size: "7.5 ml", stock: 1, price: 999, category: "women", photo: "images/products/ysl-mon-paris.png" },
  { name: "Chloé Eau de Parfum", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/chloe.png" },
  { name: "Versace Dylan Purple", size: "5 ml", stock: 1, price: 990, category: "women", photo: "images/products/dylan-purple.png"}
];

/* ---------- Render the collection grid ---------- */
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
            <a href="#contact" class="btn btn-outline btn-small">Message to Order</a>
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
/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupSearch();
  setupFilters();
  setupMobileNav();
  setupScrollShadow();
  setupEmailCopy();
});
