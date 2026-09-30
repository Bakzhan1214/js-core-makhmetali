# Laboratory Work 4 — JavaScript Core

## Project description

This project demonstrates modern JavaScript (ES6+) fundamentals: higher-order
functions, closures, deep cloning, memoization, private class fields,
inheritance, and unit testing. It is a Node.js project with no DOM, HTML, CSS,
or frontend framework.

## Technologies

- JavaScript ES6+
- Node.js
- npm
- Vitest

## Project structure

```text
js-core/
├── src/
│   ├── functions.js
│   └── Store.js
├── tests/
│   ├── functions.test.js
│   └── Store.test.js
├── package.json
├── README.md
└── .gitignore
```

## Installation and test commands

Open the `js-core` folder in Visual Studio Code, open its integrated terminal,
and install the development dependencies:

```bash
npm install
```

Run all unit tests once:

```bash
npm test
```

Run Vitest in watch mode:

```bash
npm run test:watch
```

## Implemented functions

- `unique(arr)` returns a new ordered array without duplicate values.
- `groupBy(arr, keyFn)` groups items by a key calculated by `keyFn`.
- `chunk(arr, size)` splits an array into fixed-size chunks.
- `deepClone(obj)` recursively clones objects, arrays, dates, maps, sets, and
  circular references.
- `memoize(fn)` caches results using a closure and a nested `Map` cache.
- `counter()` creates an independent counter with `inc`, `dec`, and `value`
  methods.

## Implemented classes

- `Store` stores items with an `id`, supports adding, removing, finding, and
  counting items, and uses a private field for its data.
- `SortedStore` extends `Store`, calls `super.add`, and keeps items sorted by a
  selected field after each addition.
