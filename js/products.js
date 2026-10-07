/**
 * Loads the product catalog and provides small formatting helpers.
 * Shared by every page.
 */

let _productsCache = null;

async function loadProducts() {
  if (_productsCache) return _productsCache;
  const res = await fetch('data/products.json');
  _productsCache = await res.json();
  return _productsCache;
}

function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

function coverPath(filename) {
  return `assets/covers/${filename}`;
}

function productUrl(id) {
  return `product.html?id=${id}`;
}
