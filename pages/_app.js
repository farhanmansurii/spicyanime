import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
const progress = new ProgressBar({
  size: 4,
  color: "#FF0000",
  className: "bar-of-progress",
  delay: 150,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
