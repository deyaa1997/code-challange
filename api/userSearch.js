import github from "./github";

export const searchByUser = async (userStore) => {
  try {
    const { data } = await github.search.users({
      q: `${userStore.searchParams} in:login`,
      per_page: userStore.perPage,
      page: userStore.page,
      sort: "joined",
    });
    const newUsers = data.items.map((result) => {
      return {
        id: result.id,
        name: result.login,
        avatarUrl: result.avatar_url,
        profileLink: result.html_url,
      };
    });
    userStore.setUsers(newUsers);
    userStore.setPage(userStore.page + 1);
    userStore.setHasMore(newUsers.length >= userStore.perPage);
  } catch (error) {
    userStore.setError(error);
  }
};
