/**
 * Minimal site-wide behavior: keep the header cart-count badge in sync.
 * No off-canvas nav here — the nav is a short, always-visible flex row
 * that wraps naturally on narrow screens, so there's nothing to toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
