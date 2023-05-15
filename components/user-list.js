import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchByUser } from "@/api/userSearch";
import UserCard from "./user-card";

const UserList = ({ userStore }) => {
  return (
    <>
      {userStore.startSearch ? (
        <>
          <InfiniteScroll
            dataLength={userStore.users.length}
            next={() => searchByUser(userStore)}
            hasMore={userStore.hasMore}
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
            {userStore.users &&
              userStore.users.map((user) => (
                <UserCard key={user.id} userData={user} />
              ))}
          </InfiniteScroll>
          {userStore.error && (
            <h4 style={{ color: "red", textAlign: "center" }}>
              Error: {userStore.error.message}
            </h4>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default inject("userStore")(observer(UserList));
