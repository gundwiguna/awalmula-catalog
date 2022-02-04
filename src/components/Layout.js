import Head from 'next/head';
import Navs from './Nav';

function Layout({children}) {
    return (
        <div>
            <Head>
                <title>Awalmula Catalog</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"></link>
            </Head>
            <Navs />
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;