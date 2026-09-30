export class Store {
  #items = [];

  add(item) {
    if (item === null || typeof item !== "object" || !("id" in item)) {
      throw new TypeError("Store items must be objects with an id");
    }

    this.#items.push(item);
    return item;
  }

  remove(id) {
    const index = this.#items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    this.#items.splice(index, 1);
    return true;
  }

  find(id) {
    return this.#items.find((item) => item.id === id);
  }

  total() {
    return this.#items.length;
  }

  get count() {
    return this.#items.length;
  }

  static from(items) {
    if (!Array.isArray(items)) {
      throw new TypeError("Store.from expects an array");
    }

    const store = new Store();
    items.forEach((item) => store.add(item));
    return store;
  }

  _sortBy(field) {
    this.#items.sort((first, second) => {
      if (first[field] === second[field]) {
        return 0;
      }
      return first[field] < second[field] ? -1 : 1;
    });
  }
}

export class SortedStore extends Store {
  #sortField;

  constructor(sortField = "id") {
    super();
    if (typeof sortField !== "string" || sortField.length === 0) {
      throw new TypeError("SortedStore sortField must be a non-empty string");
    }
    this.#sortField = sortField;
  }

  add(item) {
    const addedItem = super.add(item);
    this._sortBy(this.#sortField);
    return addedItem;
  }
}
