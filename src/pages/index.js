import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>YeeSIM - Redirecting...</title>
        <meta httpEquiv="refresh" content="0; url=https://yeesim.co" />
      </Head>
      <div style={{textAlign: 'center', marginTop: '40px'}}>
        <Image 
          src="/assets/yeesim-logo-1100-500.png" 
          alt="YeeSIM Logo" 
          width={180} 
          height={82}
          style={{marginBottom: '24px'}}
        />
        <p>Redirecting to <a href="https://yeesim.co">https://yeesim.co</a>...</p>
      </div>
    </>
  )
}
