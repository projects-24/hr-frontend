import '../styles/style.css'
import '../styles/fun.css'
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
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
    </Head>
    <Component {...pageProps} />
  </div>
      )
}
