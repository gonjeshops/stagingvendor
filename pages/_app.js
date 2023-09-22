import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const route = useRouter();

  useEffect(() => {
    if (route.asPath == "/") {
      route.push("/vendor");
    }
  }, []);

  return (
    <Provider store={store}>
      {!(route.asPath === "/contractPolicy") &&
      !(route.asPath === "/vendor") &&
      !(route.asPath === "/payment") &&
      !(route.asPath === "/") &&
      !(route.asPath === "/login") ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
