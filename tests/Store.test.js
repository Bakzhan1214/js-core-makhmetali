import { describe, expect, it } from "vitest";
import { SortedStore, Store } from "../src/Store.js";

describe("Store", () => {
  it("adds items and reports the total through total and count", () => {
    const store = new Store();
    store.add({ id: 1, name: "first" });
    store.add({ id: 2, name: "second" });
    expect(store.total()).toBe(2);
    expect(store.count).toBe(2);
  });

  it("removes an existing item and reports missing items", () => {
    const store = Store.from([{ id: 1 }, { id: 2 }]);
    expect(store.remove(1)).toBe(true);
    expect(store.find(1)).toBeUndefined();
    expect(store.remove(99)).toBe(false);
    expect(store.total()).toBe(1);
  });

  it("finds an item by id and validates input", () => {
    const store = new Store();
    const item = { id: "a", active: true };
    store.add(item);
    expect(store.find("a")).toBe(item);
    expect(() => store.add(null)).toThrow(TypeError);
    expect(() => Store.from("not an array")).toThrow(TypeError);
  });

  it("keeps private data inaccessible and exposes a static factory", () => {
    const store = Store.from([]);
    expect(store.items).toBeUndefined();
    expect(Store.from([{ id: 1 }])).toBeInstanceOf(Store);
  });
});

describe("SortedStore", () => {
  it("inherits Store and sorts by the selected field after add", () => {
    const store = new SortedStore("priority");
    store.add({ id: 1, priority: 30 });
    store.add({ id: 2, priority: 10 });
    store.add({ id: 3, priority: 20 });

    expect(store).toBeInstanceOf(Store);
    expect(store.find(2)).toEqual({ id: 2, priority: 10 });
    expect(store.find(1)).toEqual({ id: 1, priority: 30 });
    expect(store.total()).toBe(3);
  });

  it("uses the inherited add behavior and rejects an invalid sort field", () => {
    expect(() => new SortedStore("")).toThrow(TypeError);
    const store = new SortedStore();
    expect(() => store.add({ name: "missing id" })).toThrow(TypeError);
  });
});
