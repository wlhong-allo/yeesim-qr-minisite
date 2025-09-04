import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

export default function ProductPage({ productData }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!productData) {
    return <div>Product not found</div>
  }

  const { name, order_no, validity, iccid, apn, operator, sm_dp_addr, iphone_install_url, esim_info_url, activation_code } = productData

  return (
    <>
      <Head>
        <title>{name ? `${name} - YeeSIM` : 'YeeSIM'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: 0,
        padding: '20px',
        background: '#f5f5f5',
        color: '#333'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid #eee'
          }}>
            <Image 
              src="/assets/yeesim-logo-1100-500.png" 
              alt="YeeSIM Logo"
              width={250}
              height={114}
            />
          </div>
          
          <div style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            {name}
          </div>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid #eee'
          }}>
            <div style={{
              display: 'inline-block',
              border: '1px solid #333',
              borderRadius: '12px',
              padding: '8px',
              background: '#fff',
              marginBottom: '10px'
            }}>
              <Image 
                src={`/qr_images/${order_no}.png`}
                alt="QR Code"
                width={250}
                height={250}
                style={{ maxWidth: '250px', width: '100%', height: 'auto' }}
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
            <p>Scan this QR code to install your eSIM</p>
            <p><b>OR</b></p>
            <a href={iphone_install_url} style={{
              display: 'inline-block',
              background: 'black',
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '16px',
              marginTop: '10px',
              fontWeight: '500'
            }}>
              iOS 17.4+ Quick Install
            </a>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            marginBottom: '30px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>Order No:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{order_no}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>Validity:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{validity}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>ICCID:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{iccid}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>APN:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{apn}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>Operator:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{operator}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>SM-DP+:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{sm_dp_addr}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{fontWeight: '200', color: '#bbb', fontSize: '13px'}}>Activation Code:</span>
              <span style={{
                color: '#333',
                fontFamily: '"Fira Mono", "Consolas", "Menlo", "Monaco", "Liberation Mono", monospace',
                fontSize: '12px',
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all'
              }}>{activation_code}</span>
            </div>
            <a href={esim_info_url} style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '12px',
              textAlign: 'center',
              display: 'block',
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #dee2e6'
            }} target="_blank" rel="noopener noreferrer">
              eSIM system info
            </a>
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #eee',
            color: '#666',
            fontSize: '14px'
          }}>
            <p>Powered by YeeSIM.co</p>
            <p>Contact: hi@yeesim.co</p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const productsDir = path.join(process.cwd(), 'products')
    const files = await fs.promises.readdir(productsDir)
    const productIds = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('es_', '').replace('.json', ''))
    
    const paths = productIds.map(id => ({
      params: { productId: id }
    }))
    
    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.error('Error generating static paths:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const productId = params.productId
    const productPath = path.join(process.cwd(), 'products', `es_${productId}.json`)
    const data = await fs.promises.readFile(productPath, 'utf8')
    const productData = JSON.parse(data)
    
    return {
      props: {
        productData
      }
    }
  } catch (error) {
    console.error('Error loading product data:', error)
    return {
      props: {
        productData: null
      }
    }
  }
}
