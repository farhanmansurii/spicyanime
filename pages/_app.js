import NavigationBar from "@/components/Navigationbar";
import store from "@/redux/store";
import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { Provider } from "react-redux";
const progress = new ProgressBar({
  size: 6,
  color: "#ba0000",
  className: "bar-of-progress",
  delay: 150,

});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <NavigationBar />
      </Provider>
    </>
  );
}
