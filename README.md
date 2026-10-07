# Waveform — dummy vinyl record store

A minimal static storefront: product grid, product detail, cart, and a
Cash-on-Delivery checkout. No build step, no framework, no backend —
plain HTML/CSS/JS, so it deploys straight to GitHub Pages.

## What's included

```
waveform-store/
├── index.html          Product grid (home + shop combined)
├── product.html        Product detail (cover art, qty, add to cart)
├── cart.html           Cart page (quantities, totals, checkout button)
├── checkout.html       Delivery form → order summary → confirmation
├── 404.html            Not-found page
├── css/style.css        All styling (CSS variables for easy theming)
├── js/
│   ├── products.js      Loads product data, price formatting
│   ├── cart.js           Cart logic (localStorage)
│   ├── cart-render.js    Renders the cart page
│   ├── home.js           Renders the product grid
│   ├── product.js        Product detail page logic
│   ├── checkout.js        Checkout form + confirmation
│   └── main.js            Keeps the header cart badge in sync
├── data/products.json   6 sample vinyl records
└── assets/               Logo, favicon, and original cover art (SVG)
```

6 fictional records are included (Lo-Fi, Synthwave, Indie Folk, Jazz,
Ambient) with original abstract cover art — no real album art or band
references, so there's nothing to swap out for licensing reasons, though
you're free to replace the SVGs in `assets/covers/` with real photography
whenever you have it.

## Running it locally

```bash
cd waveform-store
python3 -m http.server 8000
# or: npx serve .
```

Then open `http://localhost:8000`.

## Deploying on GitHub Pages

1. Create a new GitHub repository and push this folder's contents:
   ```bash
   cd waveform-store
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages** → Source: "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
3. Your site is live at `https://<your-username>.github.io/<your-repo>/`
   within a minute or two.

## Connecting your Cloudflare domain

Same steps as before:

1. In GitHub: **Settings → Pages → Custom domain**, enter your domain,
   save. GitHub shows a "DNS check" status until DNS is set up.
2. In Cloudflare: **DNS** (left sidebar) → add these records:
   - 4× **A** record, name `@`, pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1× **CNAME** record, name `www`, target `<your-username>.github.io`
   - Click the orange cloud icon next to each record so it's grey
     ("DNS only") until GitHub Pages confirms the domain, then it can go
     back to orange (proxied).
3. Back in GitHub Pages settings, wait for the "DNS check successful"
   message, then tick **Enforce HTTPS**.
4. In Cloudflare: **SSL/TLS → Overview**, set encryption mode to **Full**.

## Adding or editing products

Edit `data/products.json`. Each entry needs: `id`, `title`, `artist`,
`format`, `genre`, `price`, `compareAt` (or `null`), `cover` (filename in
`assets/covers/`), `description`, `details` (array of bullet strings),
and `featured` (unused by default, there for future use — e.g. a
"featured" section). Add new cover art to `assets/covers/` and reference
the filename.

## Checkout / orders

`checkout.html` + `js/checkout.js` is a Cash-on-Delivery flow: the
customer fills in name/phone/address, submits, and sees an "order
placed" confirmation. There's no notification wired up yet — to get a
WhatsApp message with the order details each time someone checks out,
open `js/checkout.js` and set `WHATSAPP_NUMBER` to your business WhatsApp
number (digits only, with country code, e.g. `"923001234567"`). Leave it
blank (the default) to skip that — nothing WhatsApp-related shows
anywhere on the site either way.

## Notes

- Prices are in Pakistani Rupees (Rs.), formatted in `js/products.js`.
  Free-shipping threshold (Rs. 8,000) and flat shipping fee (Rs. 250) are
  set as constants at the top of `js/cart-render.js` and `js/checkout.js`.
- The cart is a demo (localStorage-based), so everything works with no
  backend.
- This is intentionally a smaller, simpler sibling of a fuller clothing
  store template — just enough pages to add a product and test a full
  checkout flow end to end.
