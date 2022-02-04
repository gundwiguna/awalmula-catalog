import Layout from '../src/components/Layout';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps, categories }) {
  return <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
}

export default MyApp
