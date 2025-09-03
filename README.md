# YeeSIM eSIM QR Code Mini Site

A Node.js/Express-based mini site for hosting eSIM QR code products.

## Features

- Dynamic product pages based on URL parameters
- Clean, responsive design matching YeeSIM branding
- Static asset serving for logos and QR images
- Local JSON file storage for product data

## URL Structure

- Home: `https://qr.yeesim.co/`
- Product: `https://qr.yeesim.co/p/{productId}`

## Content Structure

Product JSON files should be stored in the `products/` directory with the following fields:

```json
{
  "name": "Product Name",
  "order_no": "Order Number",
  "validity": "Validity Period",
  "iccid": "ICCID",
  "apn": "APN",
  "operator": "Network Operator",
  "eid": "EID"
}
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start production server:
   ```bash
   npm start
   ```

## Development

Run locally with auto-reload:
```bash
npm run dev
```

## File Structure

```
├── public/
│   ├── assets/           # Static assets (logos)
│   └── qr_images/        # QR code images
├── src/
│   └── index.js          # Express server
├── products/              # Product JSON files
└── package.json
```

## Deployment

This is a standard Node.js project that can be deployed to any platform:
- Cloudflare Pages
- Vercel
- Netlify
- Heroku
- Any VPS with Node.js
