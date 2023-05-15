import styles from "@/styles/Home.module.css";
import Title from "@/components/title";
import SearchBar from "@/components/search-bar";
import { inject, observer } from "mobx-react";
import UserList from "@/components/user-list";
import dynamic from "next/dynamic";
import RepoList from "@/components/repo-list";

const Select = dynamic(() => import("react-select"), { ssr: false });

const types = [
  { value: "users", label: "Users" },
  { value: "repositories", label: "Repositories" },
];

function Home({ globalStore, userStore, repoStore }) {
  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title />
          <Select
            options={types}
            value={{
              label: globalStore.searchTypeLabel,
              value: globalStore.searchTypeValue,
            }}
            onChange={(newValue) => {
              globalStore.setSearchType(newValue);
            }}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                minWidth: "180px",
              }),
            }}
          />
        </div>
        <main>
          <SearchBar />
          {globalStore.searchTypeValue === "users" ? (
            <UserList />
          ) : (
            <RepoList />
          )}
        </main>
      </div>
    </>
  );
}

export default inject("globalStore", "userStore", "repoStore")(observer(Home));
