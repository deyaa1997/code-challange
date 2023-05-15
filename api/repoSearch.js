import github from "./github";
import mime from "mime-types";

export const searchByRepo = async (repoStore) => {
  try {
    const { data } = await github.search.repos({
      q: `${repoStore.searchParams} in:full_name is:public forks:>=3`,
      per_page: repoStore.perPage,
      page: repoStore.page,
      sort: "joined",
    });
    const repositories = data.items;

    // Process repositories
    const processedRepositories = repositories.map(async (repo) => {
      // Fetch the repository details
      const repoDetails = await github.repos.get({
        owner: repo.owner.login,
        repo: repo.name,
      });

      // Get the repository's file types
      const fileType = await getRepositoryFileType(repoDetails.data);

      // Get the usernames and avatars of the last 3 forks
      const forkers = await getLastForkers(repoDetails.data);

      // Update the repository object with file type and forkers

      return {
        id: repo.id,
        name: repo.full_name,
        fileType,
        forkers,
        createdAt: repo.created_at,
        language: repo.language,
        url: repo.html_url,
      };
    });

    const newRepos = await Promise.all(processedRepositories);
    repoStore.setRepos(newRepos);
    repoStore.setPage(repoStore.page + 1);
    repoStore.setHasMore(newRepos.length >= repoStore.perPage);
  } catch (error) {
    repoStore.setError(error);
  }
};

const getRepositoryFileType = async (repoDetails) => {
  // Fetch the repository's files
  const filesResponse = await github.repos.getContent({
    owner: repoDetails.owner.login,
    repo: repoDetails.name,
  });

  // Extract the file extensions/types
  const fileExtensions = [];
  filesResponse.data.forEach((file) => {
    let type = getFileExtension(file.name);
    if (type) {
      fileExtensions.push(type);
    }
  });
  const fileTypes = [...new Set(fileExtensions)];
  return fileTypes;
};

const getLastForkers = async (repoDetails) => {
  // Fetch the repository's forks
  const forksResponse = await github.repos.listForks({
    owner: repoDetails.owner.login,
    repo: repoDetails.name,
    per_page: 3,
    sort: "newest",
  });

  // Get the usernames and avatars of the last 3 forkers
  const forkers = forksResponse.data.slice(0, 3).map((fork) => ({
    id: fork.id,
    name: fork.owner.login,
    avatar: fork.owner.avatar_url,
    forkUrl: fork.html_url,
  }));
  return forkers;
};

const getFileExtension = (filename) => {
  const fileType = mime.lookup(filename);
  if (fileType) {
    return fileType;
  }
};
