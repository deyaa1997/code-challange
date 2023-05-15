import { observable, action, makeAutoObservable } from "mobx";

class UserStore {
  @observable users = [];
  @observable searchParams = "";
  @observable page = 1;
  @observable hasMore = true;
  @observable error = "";
  @observable startSearch = false;
  @observable perPage = 7;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setUsers(newUsers) {
    this.users.splice(this.users.length, 0, ...newUsers);
  }

  @action
  removeUsers() {
    this.users = [];
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

const userStore = new UserStore();

export default userStore;
