import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@stripe/stripe-js'
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


import LayoutB2b from "../componentsB2b/LayoutB2b/LayoutB2b";
import GlobalStateProvider from "@/context/GlobalStateProvider";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  // protect page
  const publicPaths = [
    '/',
    '/contractPolicy', 
    "/vendor",
    "/payment",
    "/login",
    "/sigin",
    "/signup",
    "/howItworks",
    "/aboutUs",
    "/contactUs",
    "/faq",
    "/vendors",
    "/suppliers",
    "/privacy_policies",
  ]
  

  useEffect( () => {
    const user_detail = JSON.parse(localStorage.getItem("user_detail"));
    const isPublic = publicPaths.includes(router.asPath) ||  router.asPath.startsWith("/signup") || router.asPath.startsWith("/signin");
  
    if (!isPublic && !user_detail) {
      router.push("/signup");
    }
    
  }, [router.asPath]);

 
  return (
    <PayPalScriptProvider options={{"client_id": process.env.NEXT_PUBLIC_PAYPAL_ID_DEFAULT_APP}} >
        <Provider store={store}>
        <GlobalStateProvider>
        

        {!(router.asPath === "/contractPolicy") &&
        !(router.asPath === "/vendor") &&
        !(router.asPath === "/payment") &&
        !(router.asPath === "/") &&
        !(router.asPath === "/login") && 
        !(router.asPath.split('/').includes('vendorb2b')) && 
        !(router.asPath.split('/').includes('signup')) && 
        !(router.asPath.split('/').includes('signin'))? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : 
        (router.asPath.split('/').includes('vendorb2b'))  ? (
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
    </PayPalScriptProvider>
    
  );
}

export default MyApp;
