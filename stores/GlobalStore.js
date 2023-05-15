import { action, makeAutoObservable } from "mobx";

class GlobalStore {
  searchTypeValue = "users";
  searchTypeLabel = "Users";

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSearchType(type) {
    this.searchTypeValue = type.value;
    this.searchTypeLabel = type.label;
  }
}

const globalStore = new GlobalStore();

export default globalStore;
