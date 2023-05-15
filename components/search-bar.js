import styles from "../styles/SearchBar.module.css";
import Image from "next/image";
import SearchIcon from "../public/icon-search.svg";
import { searchByUser } from "@/api/userSearch";
import { searchByRepo } from "@/api/repoSearch";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { inject, observer } from "mobx-react";

const SearchBar = ({ userStore, repoStore, globalStore }) => {
  useEffect(() => {}, [
    userStore.searchParams,
    repoStore.searchParams,
    globalStore.searchTypeValue,
  ]);

  const handleInputUserChange = (e) => {
    const { value } = e.target;
    userStore.setSearchParams(value);
  };

  const handleInputRepoChange = (e) => {
    const { value } = e.target;
    repoStore.setSearchParams(value);
  };

  const debouncedSearch = debounce(async () => {
    if (globalStore.searchTypeValue === "users") {
      if (userStore.searchParams.trim().length) {
        userStore.setStartSearch(true);
        searchByUser(userStore);
      }
    } else {
      if (repoStore.searchParams.trim().length) {
        repoStore.setStartSearch(true);
        searchByRepo(repoStore);
      }
    }
  }, 500);

  const applySearchQuery = (event) => {
    event.preventDefault();
    debouncedSearch();
    return debouncedSearch.cancel;
  };

  return (
    <>
      <form className={styles["search-container"]} onSubmit={applySearchQuery}>
        <Image
          src={SearchIcon}
          className={styles["search-icon"]}
          alt="Search icon"
          width={25}
          height={25}
        />
        {globalStore.searchTypeValue === "users" ? (
          <input
            id="1"
            type="text"
            className={styles["search-input"]}
            placeholder="Search GitHub username..."
            autoComplete="false"
            onChange={handleInputUserChange}
            value={userStore.searchParams}
          />
        ) : (
          <input
            id="2"
            type="text"
            className={styles["search-input"]}
            placeholder="Search GitHub username..."
            autoComplete="false"
            onChange={handleInputRepoChange}
            value={repoStore.searchParams}
          />
        )}

        {globalStore.searchTypeValue === "users" ? (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => {
              userStore.setPage(1);
              userStore.removeUsers();
              userStore.setHasMore(true);
              userStore.setError("");
            }}
          >
            Search
          </button>
        ) : (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => {
              repoStore.setPage(1);
              repoStore.removeRepos();
              repoStore.setHasMore(true);
              repoStore.setError("");
            }}
          >
            Search
          </button>
        )}
      </form>
    </>
  );
};

export default inject(
  "userStore",
  "globalStore",
  "repoStore"
)(observer(SearchBar));
