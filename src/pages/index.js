import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.less';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Pingz. I'm a filipino software engineer. You can contact me on <a href='#'>Skype</a>.</p>
        <p>
          This is a web app built using NextJS and MongoDB as an exam for the role Front End Developer at Cognizant.
          Please proceed <Link href="/employees">here</Link> to start off.
        </p>
      </section>
    </Layout>
  );
}