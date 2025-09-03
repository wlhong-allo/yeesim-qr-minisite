const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/qr_images', express.static(path.join(__dirname, '../public/qr_images')));

// Home page route
app.get('/', (req, res) => {
  res.send(createHomePage());
});

// Product page route: /p/{productId}
app.get('/p/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const productData = await loadProductData(productId);
    
    if (!productData) {
      return res.status(404).send('Product not found');
    }

    res.send(createProductPage(productData));
  } catch (error) {
    console.error('Error loading product:', error);
    res.status(500).send('Internal Server Error');
  }
});

async function loadProductData(productId) {
  try {
    // Try to load from local products directory
    const productPath = path.join(__dirname, '../products', `es_${productId}.json`);
    const data = await fs.readFile(productPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load product data:', error);
    return null;
  }
}

function createHomePage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="refresh" content="0; url=https://yeesim.co">
  <title>YeeSIMRedirecting...</title>
</head>
<body>
  <div style="text-align:center; margin-top:40px;">
    <img src="/assets/yeesim-logo-1100-500.png" alt="YeeSIM Logo" style="max-width:180px; height:auto; margin-bottom:24px;">
    <p>Redirecting to <a href="https://yeesim.co">https://yeesim.co</a>...</p>
  </div>
</body>
</html>
`;
}

function createProductPage(productData) {
  const { name, order_no, validity, iccid, apn, operator, sm_dp_addr, iphone_install_url, esim_info_url, activation_code } = productData;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - YeeSIM</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
            color: #333;
        }
        .container { 
            max-width: 400px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        .logo { 
            text-align: center; 
            margin-bottom: 30px; 
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .logo img { 
            max-width: 250px; 
            height: auto; 
        }
        .product-title { 
            text-align: center; 
            color: #333; 
            margin-bottom: 30px; 
            font-size: 24px;
            font-weight: 600;
        }
        .qr-section {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .qr-image-wrapper {
            display: inline-block;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 8px;
            background: #fff;
            margin-bottom: 10px;
        }
        .qr-image {
            max-width: 250px;
            height: auto;
            display: block;
            border-radius: 8px;
        }
        .install-button {
            display: inline-block;
            background: black;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 16px;
            margin-top: 10px;
            font-weight: 500;
        }
        .info-grid {
            display: flex;
            flex-direction: column;
            gap: 2px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border: 1px solid #e9ecef;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #dee2e6;
        }
        .info-item:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 200;
            color: #bbb;
            font-size: 13px;
        }
        .info-value {
            color: #333;
            font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', 'Liberation Mono', monospace;
            font-size: 12px;
            max-width: 60%;
            text-align: right;
            word-break: break-all;
        }
        .esim-info-link {
            color: #666;
            text-decoration: none;
            font-size: 12px;
            text-align: center;
            display: block;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #dee2e6;
        }
        .esim-info-link:hover {
            text-decoration: underline;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/assets/yeesim-logo-1100-500.png" alt="YeeSIM Logo">
        </div>
        
        <div class="product-title">${name}</div>
        
        <div class="qr-section">
            <span class="qr-image-wrapper">
                <img src="/qr_images/${order_no}.png" alt="QR Code" class="qr-image" onerror="this.style.display='none'">
            </span>
            <p>Scan this QR code to install your eSIM</p>
            <p><b>OR</b></p>
            <a href="${iphone_install_url}" class="install-button">
                iOS 17.4+ Quick Install
            </a>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Order No:</span>
                <span class="info-value">${order_no}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Validity:</span>
                <span class="info-value">${validity}</span>
            </div>
            <div class="info-item">
                <span class="info-label">ICCID:</span>
                <span class="info-value">${iccid}</span>
            </div>
            <div class="info-item">
                <span class="info-label">APN:</span>
                <span class="info-value">${apn}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Operator:</span>
                <span class="info-value">${operator}</span>
            </div>
            <div class="info-item">
                <span class="info-label">SM-DP+:</span>
                <span class="info-value">${sm_dp_addr}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Activation Code:</span>
                <span class="info-value">${activation_code}</span>
            </div>
            <a href="${esim_info_url}" class="esim-info-link" target="_blank">eSIM system info</a>
        </div>
        
        <div class="footer">
            <p>Powered by YeeSIM.co</p>
            <p>Contact: hi@yeesim.co</p>
        </div>
    </div>
</body>
</html>`;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
