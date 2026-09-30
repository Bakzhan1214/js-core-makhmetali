/**
 * Returns a new array containing each value only once.
 * Set preserves insertion order and does not mutate the input.
 */
export const unique = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("unique expects an array");
  }

  const seen = new Set();

  return arr.filter((item) => {
    if (seen.has(item)) {
      return false;
    }

    seen.add(item);
    return true;
  });
};

/**
 * Groups array items by the value returned from keyFn.
 */
export const groupBy = (arr, keyFn) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("groupBy expects an array");
  }
  if (typeof keyFn !== "function") {
    throw new TypeError("groupBy expects keyFn to be a function");
  }

  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    const groupKey = typeof key === "symbol" ? key : String(key);

    if (!Object.prototype.hasOwnProperty.call(groups, groupKey)) {
      Object.defineProperty(groups, groupKey, {
        configurable: true,
        enumerable: true,
        value: [],
        writable: true,
      });
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Splits an array into chunks of the requested size.
 */
export const chunk = (arr, size) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("chunk expects an array");
  }
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError("chunk size must be a positive integer");
  }

  return Array.from({ length: Math.ceil(arr.length / size) })
    .map((_, index) => arr.slice(index * size, index * size + size));
};

/**
 * Creates a deep copy while preserving circular references.
 */
export const deepClone = (value, seen = new WeakMap()) => {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof Map) {
    const clone = new Map();
    seen.set(value, clone);

    for (const [mapKey, mapValue] of value) {
      clone.set(deepClone(mapKey, seen), deepClone(mapValue, seen));
    }

    return clone;
  }

  if (value instanceof Set) {
    const clone = new Set();
    seen.set(value, clone);
    value.forEach((item) => clone.add(deepClone(item, seen)));
    return clone;
  }

  const clone = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));
  seen.set(value, clone);

  Reflect.ownKeys(value).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && "value" in descriptor) {
      descriptor.value = deepClone(descriptor.value, seen);
    }
    Object.defineProperty(clone, key, descriptor);
  });

  return clone;
};

/**
 * Memoizes a function using a nested Map cache for all argument values.
 */
export const memoize = (fn) => {
  if (typeof fn !== "function") {
    throw new TypeError("memoize expects a function");
  }

  const root = new Map();
  const memoized = (...args) => {
    let node = root;

    args.forEach((arg) => {
      if (!node.has(arg)) {
        node.set(arg, new Map());
      }
      node = node.get(arg);
    });

    if (node.has(memoized)) {
      return node.get(memoized);
    }

    const result = fn(...args);
    node.set(memoized, result);
    return result;
  };

  return memoized;
};

/**
 * Creates an independent counter backed by a closure.
 */
export const counter = () => {
  let current = 0;

  return {
    inc: () => ++current,
    dec: () => --current,
    value: () => current,
  };
};
