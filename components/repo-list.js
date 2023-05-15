import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchByRepo } from "@/api/repoSearch";
import RepoCard from "./repo-card";

const RepoList = ({ repoStore }) => {
  return (
    <>
      {repoStore.startSearch ? (
        <>
          <InfiniteScroll
            dataLength={repoStore.repos.length}
            next={() => searchByRepo(repoStore)}
            hasMore={repoStore.hasMore}
            loader={
              <h4 style={{ color: "white", textAlign: "center" }}>
                Loading...
              </h4>
            }
            endMessage={
              <h4 style={{ color: "white", textAlign: "center" }}>
                No Results Found
              </h4>
            }
          >
            {repoStore.repos &&
              repoStore.repos.map((repo) => (
                <RepoCard key={repo.id} repoData={repo} />
              ))}
          </InfiniteScroll>
          {repoStore.error && (
            <h4 style={{ color: "red", textAlign: "center" }}>
              Error: {repoStore.error.message}
            </h4>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default inject("repoStore")(observer(RepoList));
