# Laboratory Work 4 — JavaScript Core

## Project description

I created this project to practise JavaScript functions, closures, classes,
inheritance, and unit testing. I wrote it for Node.js, without using the DOM,
HTML, CSS, or frontend frameworks.

## Technologies

- I used **JavaScript ES6+** to write the functions and classes. I used array
  methods, spread syntax, closures, private fields, and inheritance.
- I used **Node.js** to run the project outside a browser.
- I used **npm** to install Vitest and run the commands configured in
  `package.json`.
- I used **Vitest** to write and run the unit tests in `tests/`.
- I used **Visual Studio Code** to edit the files and run commands in its
  integrated terminal.

I did not use the browser DOM, HTML, CSS, or frontend frameworks.

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


## Implemented functions

I implemented these six functions in `src/functions.js`:

- `unique(arr)` returns a new array with duplicates removed while preserving
  the original order.
- `groupBy(arr, keyFn)` uses `keyFn` to calculate a key for each item and
  collects items with the same key into groups.
- `chunk(arr, size)` splits an array into chunks and rejects sizes that are
  zero, negative, or not integers.
- `deepClone(obj)` recursively copies objects and arrays without using JSON
  serialization. It also handles circular references, dates, maps, and sets.
- `memoize(fn)` uses a closure and nested `Map` objects to cache results for
  calls with the same arguments.
- `counter()` uses a closure to keep its value private and returns `inc`, `dec`,
  and `value` methods.

## Implemented classes

I implemented `Store` in `src/Store.js`. It stores items in a private `#items`
field and provides methods to add, remove, find, and count items. I added the
`count` getter and the static `Store.from()` factory method.

I made `SortedStore` extend `Store`. I overrode `add()`, called `super.add()`
to reuse the parent validation and insertion logic, and then sorted the stored
items by the selected field.

## Tests

I wrote 17 unit tests in `tests/`. They cover the functions and classes,
including empty arrays, invalid input, invalid chunk sizes, missing items,
duplicate values, caching, deep-copy independence, and sorting. I ran them
with `npm test`.
<img width="1039" height="383" alt="image" src="https://github.com/user-attachments/assets/e0378f5f-e39c-45eb-8fb5-f39c78e1f750" />
