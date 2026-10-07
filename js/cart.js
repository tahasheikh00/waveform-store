/**
 * localStorage-backed cart. Each line is simply { id, qty } since every
 * product here is a single-variant vinyl record (no size/color options).
 */

const CART_KEY = 'waveform_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, qty) {
  const cart = getCart();
  const existing = cart.find((line) => line.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function removeLine(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateLineQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return;
  if (qty < 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = qty;
  }
  saveCart(cart);
}

function cartItemCount() {
  return getCart().reduce((sum, line) => sum + line.qty, 0);
}

function updateCartCount() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = cartItemCount();
  });
}

document.addEventListener('DOMContentLoaded', updateCartCount);
