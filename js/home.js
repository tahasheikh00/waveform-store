/**
 * Renders the product grid on index.html.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;

  const products = await loadProducts();
  grid.innerHTML = products.map((p) => `
    <a class="product-card" href="${productUrl(p.id)}">
      <div class="cover"><img src="${coverPath(p.cover)}" alt="${p.title} cover art"></div>
      <div class="info">
        <p class="genre">${p.genre}</p>
        <h3>${p.title}</h3>
        <p class="artist">${p.artist}</p>
        <div class="price-row">
          <span>${formatPrice(p.price)}</span>
          ${p.compareAt ? `<span class="compare-at">${formatPrice(p.compareAt)}</span>` : ''}
        </div>
      </div>
    </a>
  `).join('');
});
