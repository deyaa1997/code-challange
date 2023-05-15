import { observable, action, makeAutoObservable } from "mobx";

class RepoStore {
  @observable repos = [];
  @observable searchParams = "";
  @observable page = 1;
  @observable hasMore = true;
  @observable error = "";
  @observable startSearch = false;
  @observable perPage = 5;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setRepos(newRepos) {
    this.repos.splice(this.repos.length, 0, ...newRepos);
  }

  @action
  removeRepos() {
    this.repos = [];
  }

  @action
  setSearchParams(search) {
    this.searchParams = search;
  }

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  setError(error) {
    this.error = error;
  }

  @action
  setHasMore(value) {
    this.hasMore = value;
  }

  @action
  setStartSearch(value) {
    this.startSearch = value;
  }
}

const repoStore = new RepoStore();

export default repoStore;
