import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { useRouter } from "next/router";
import "../styles/globals.css";
// import "../styles/b2b.css"
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// b2b
import LayoutB2b from "../componentsB2b/LayoutB2b/LayoutB2b";
import GlobalStateProvider from "@/context/GlobalStateProvider";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const route = useRouter();

  useEffect(() => {
    if (route.asPath == "/") {
      route.push("/vendorb2b");
    }
  }, [route.asPath]);

  return (
    <Provider store={store}>
    <GlobalStateProvider>

      {!(route.asPath === "/contractPolicy") &&
      !(route.asPath === "/vendor") &&
      !(route.asPath === "/payment") &&
      !(route.asPath === "/") &&
      !(route.asPath === "/login") && 
      !(route.asPath.split('/').includes('vendorb2b')) && 
      !(route.asPath.split('/').includes('signup')) && 
      !(route.asPath.split('/').includes('signin'))? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : 
      (route.asPath.split('/').includes('vendorb2b'))  ? (
        <LayoutB2b>
          <Component {...pageProps} />
        </LayoutB2b>
      )
      :
      (
        <Component {...pageProps} />
      )}
    
      <ToastContainer />
      </GlobalStateProvider>
    </Provider>
  );
}

export default MyApp;
