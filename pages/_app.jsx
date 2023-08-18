import '../styles/_styles.css'
import '../styles/style.css'
import '../styles/default.css'
import '../styles/lineIcons/css/simple-line-icons.css'
import Head from 'next/head'
import 'funuicss/css/fun.css'
export default function App({ Component, pageProps }) {
  return (
  <div>
    <Head>
    <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet" />
   <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.csss" rel="stylesheet" />
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&display=swap" />
    </Head>
<div className="body">
<Component {...pageProps} />
</div>
  </div>
      )
}
