'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

// Array untuk menyimpan keranjang belanja
let cart = [];

// Data contoh produk (untuk simulasi)
const products = [
  { id: "3726", name: "3726 MDPL", price: 89550 },
  { id: "3727", name: "Facial Cleanser", price: 99500 },
];

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return; // Produk tidak ditemukan

  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  updateCartUI();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartUI() {
  const cartList = document.querySelector(".cart-list");
  const cartTotalPrice = document.querySelector("#cart-total-price");

  // Kosongkan daftar keranjang
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>Rp${(item.price * item.quantity).toLocaleString()}</span>
    `;
    cartList.appendChild(listItem);
  });

  // Perbarui total harga
  cartTotalPrice.textContent = `Rp${total.toLocaleString()}`;
}

// Tambahkan event listener untuk tombol add-to-cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    addToCart(productId);
  });
});

// Tambahkan event listener untuk tombol add-to-cart
document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  let cartTotal = 0;

  const updateCartDisplay = () => {
    document.getElementById("cart-count").innerText = cartCount;
    document.querySelector(".btn-text").innerText = `Rp${cartTotal.toLocaleString("id-ID")}`;
  };

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productPrice = parseInt(button.getAttribute("data-product-price"));
      cartCount += 1;
      cartTotal += productPrice;
      updateCartDisplay();
    });
  });
});


