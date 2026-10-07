/**
 * Product detail page (product.html?id=...). Depends on products.js and
 * cart.js being loaded first.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.querySelector('#product-root');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const products = await loadProducts();
  const p = products.find((x) => x.id === id);

  if (!p) {
    root.innerHTML = `
      <div class="cart-empty">
        <h2>Record not found</h2>
        <p class="form-note" style="margin-bottom:24px;">That record doesn't seem to exist.</p>
        <a href="index.html" class="btn">Back to shop</a>
      </div>`;
    return;
  }

  document.title = `${p.title} — Waveform`;

  root.innerHTML = `
    <div class="cover"><img src="${coverPath(p.cover)}" alt="${p.title} cover art"></div>
    <div>
      <p class="genre">${p.genre} · ${p.format}</p>
      <h1>${p.title}</h1>
      <p class="artist">${p.artist}</p>
      <div class="price-row">
        <span>${formatPrice(p.price)}</span>
        ${p.compareAt ? `<span class="compare-at">${formatPrice(p.compareAt)}</span>` : ''}
      </div>
      <p class="description">${p.description}</p>
      <ul class="details-list">
        ${p.details.map((d) => `<li>${d}</li>`).join('')}
      </ul>
      <div class="qty-row">
        <div class="qty-stepper">
          <button type="button" id="qty-dec" aria-label="Decrease quantity">&minus;</button>
          <input type="text" id="qty-value" value="1" readonly>
          <button type="button" id="qty-inc" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="btn" id="add-to-cart-btn">Add to cart</button>
      <p class="form-note" id="add-to-cart-note" style="margin-top:12px; display:none;">Added to cart.</p>
    </div>`;

  let qty = 1;
  const qtyInput = document.querySelector('#qty-value');
  document.querySelector('#qty-inc').addEventListener('click', () => {
    qty += 1;
    qtyInput.value = qty;
  });
  document.querySelector('#qty-dec').addEventListener('click', () => {
    if (qty <= 1) return;
    qty -= 1;
    qtyInput.value = qty;
  });

  document.querySelector('#add-to-cart-btn').addEventListener('click', () => {
    addToCart(p.id, qty);
    const note = document.querySelector('#add-to-cart-note');
    note.style.display = 'block';
    setTimeout(() => { note.style.display = 'none'; }, 2000);
  });
});
