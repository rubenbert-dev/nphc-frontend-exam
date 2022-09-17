import Link from 'next/link'
import Head from 'next/head'

import Layout from '../../components/layout';
import Alert from '../../components/alert';
// import Script from 'next/script'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      /> */}
      <h1>First Post</h1>
      <Alert type="success">
        <h4>The server says: Hello!</h4>
      </Alert>
    </Layout>
  );
}