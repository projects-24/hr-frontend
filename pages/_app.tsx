import '../styles/style.css'
import '../styles/fun.css'
import '../styles/default.css'
import '../styles/lineIcons/css/simple-line-icons.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet" />
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&display=swap" />
    </Head>
<div className="body">
<Component {...pageProps} />
</div>
  </div>
      )
}
