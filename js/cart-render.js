/**
 * Renders the full cart page (cart.html). Depends on products.js and
 * cart.js being loaded first.
 */

const SHIPPING_FLAT = 250;
const FREE_SHIPPING_THRESHOLD = 8000;

async function renderCartPage() {
  const body = document.querySelector('#cart-page-body');
  const summary = document.querySelector('#cart-summary');
  if (!body) return;

  const cart = getCart();
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p class="form-note" style="margin-bottom:24px;">Looks like you haven't added anything yet.</p>
        <a href="index.html" class="btn">Continue shopping</a>
      </div>`;
    if (summary) summary.style.display = 'none';
    return;
  }

  const products = await loadProducts();
  let subtotal = 0;
  body.innerHTML = cart.map((line, i) => {
    const p = products.find((x) => x.id === line.id);
    if (!p) return '';
    const lineTotal = p.price * line.qty;
    subtotal += lineTotal;
    return `
      <div class="cart-line">
        <div class="thumb"><img src="${coverPath(p.cover)}" alt="${p.title}"></div>
        <div class="meta">
          <h3><a href="${productUrl(p.id)}">${p.title}</a></h3>
          <div class="variant">${p.artist} · ${p.format}</div>
          <div class="qty-stepper" style="margin-top:8px;">
            <button data-qty-dec="${i}" aria-label="Decrease quantity">&minus;</button>
            <input type="text" value="${line.qty}" readonly data-qty-value="${i}">
            <button data-qty-inc="${i}" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn" style="margin-top:8px;" data-remove="${i}">Remove</button>
        </div>
        <div class="line-total">${formatPrice(lineTotal)}</div>
      </div>`;
  }).join('');

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  if (summary) {
    summary.style.display = '';
    summary.innerHTML = `
      <h2 style="margin-top:0;">Order summary</h2>
      <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatPrice(subtotal + shipping)}</span></div>
      <a class="btn btn-block" id="checkout-btn" href="checkout.html" style="margin-top:16px;">Checkout</a>
      <p class="form-note" style="margin-top:12px;">Cash on Delivery. You'll enter your delivery details on the next step.</p>`;
  }

  body.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => { removeLine(Number(btn.dataset.remove)); renderCartPage(); });
  });
  body.querySelectorAll('[data-qty-inc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.qtyInc);
      updateLineQty(i, getCart()[i].qty + 1);
      renderCartPage();
    });
  });
  body.querySelectorAll('[data-qty-dec]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.qtyDec);
      updateLineQty(i, getCart()[i].qty - 1);
      renderCartPage();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#cart-page-body')) renderCartPage();
});
