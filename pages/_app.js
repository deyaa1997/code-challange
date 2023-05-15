import "@/styles/globals.css";
import { Provider } from "mobx-react";
import userStore from "@/stores/UserStore";
import globalStore from "@/stores/GlobalStore";
import repoStore from "@/stores/RepoStore";

export default function App({ Component, pageProps }) {
  return (
    <Provider {...{ globalStore, userStore, repoStore }}>
      <Component {...pageProps} />
    </Provider>
  );
}
