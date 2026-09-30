import { describe, expect, it, vi } from "vitest";
import {
  chunk,
  counter,
  deepClone,
  groupBy,
  memoize,
  unique,
} from "../src/functions.js";

describe("unique", () => {
  it("removes duplicates and preserves order without mutation", () => {
    const input = [3, 1, 3, 2, 1];
    expect(unique(input)).toEqual([3, 1, 2]);
    expect(input).toEqual([3, 1, 3, 2, 1]);
  });

  it("handles an empty array and rejects non-arrays", () => {
    expect(unique([])).toEqual([]);
    expect(() => unique("not an array")).toThrow(TypeError);
  });
});

describe("groupBy", () => {
  it("groups values by a computed key", () => {
    const items = [{ type: "a", value: 1 }, { type: "b", value: 2 }, { type: "a", value: 3 }];
    expect(groupBy(items, (item) => item.type)).toEqual({
      a: [items[0], items[2]],
      b: [items[1]],
    });
  });

  it("returns an empty object for an empty array", () => {
    expect(groupBy([], (item) => item)).toEqual({});
    expect(() => groupBy([], null)).toThrow(TypeError);
  });
});

describe("chunk", () => {
  it("splits an array and leaves a shorter final chunk", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles empty arrays and invalid sizes", () => {
    expect(chunk([], 2)).toEqual([]);
    expect(() => chunk([1], 0)).toThrow(RangeError);
    expect(() => chunk([1], -1)).toThrow(RangeError);
    expect(() => chunk([1], "2")).toThrow(RangeError);
  });
});

describe("deepClone", () => {
  it("clones nested objects and arrays independently", () => {
    const original = { user: { name: "Ada" }, scores: [1, { value: 2 }] };
    const copy = deepClone(original);
    copy.user.name = "Grace";
    copy.scores[1].value = 5;
    expect(original).toEqual({ user: { name: "Ada" }, scores: [1, { value: 2 }] });
    expect(copy).toEqual({ user: { name: "Grace" }, scores: [1, { value: 5 }] });
  });

  it("supports null, primitives, and circular references", () => {
    const circular = {};
    circular.self = circular;
    const copy = deepClone(circular);
    expect(deepClone(null)).toBeNull();
    expect(deepClone(42)).toBe(42);
    expect(copy).not.toBe(circular);
    expect(copy.self).toBe(copy);
  });
});

describe("memoize", () => {
  it("caches repeated calls with the same arguments", () => {
    const implementation = vi.fn((a, b) => a + b);
    const add = memoize(implementation);
    expect(add(2, 3)).toBe(5);
    expect(add(2, 3)).toBe(5);
    expect(add(3, 2)).toBe(5);
    expect(implementation).toHaveBeenCalledTimes(2);
  });

  it("rejects a non-function", () => {
    expect(() => memoize(null)).toThrow(TypeError);
  });
});

describe("counter", () => {
  it("increments, decrements, and returns its value", () => {
    const value = counter();
    expect(value.value()).toBe(0);
    expect(value.inc()).toBe(1);
    expect(value.inc()).toBe(2);
    expect(value.dec()).toBe(1);
    expect(value.value()).toBe(1);
  });
});
