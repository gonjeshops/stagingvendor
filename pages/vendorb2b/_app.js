import '@/styles/globals.css'
import Layout from '@/components/Layout/Layout';
import GlobalStateProvider from '@/context/GlobalStateProvider';



export default function App({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalStateProvider>
    )
}