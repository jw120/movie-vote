Movie voting app with React, Redux and Typescript

Simple multi-client cooperative voting application based very loosely on the
[article](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
by
[Tero Parviainen](http://teropa.info/) [(@teropa)](https://twitter.com/teropa)
It uses

* React 0.14 (with ES6 class-style components - unfortunately Typescript does not yet work with stateless functional components)
* Redux 3.0 and react-redux 4.0
* Bootstrap 3.3 via React-bootstrap 0.28
*
and is built with Typescript 1.7 and webpack (with hot loading) with mocha and mjackson/expect for tests

### Design notes and choices

Single SPA that allows any client to be a vote host or participant. Extremely simple server (which does not serve files)

UI design is very modal with the app's state shared across the modes, so the reducer is sub-divided by mode rather than being treated as a tree of sub-states. This means it is simplest to preserve state manually and there is no need to use selectors/reselect.

### Typescript challenges

* Istanbul on ts
* connect type

### Running the application

```
git clone http://https://github.com/jw120/movie-vote
npm run build:dev
npm run start:server
open http://http://127.0.0.1:8080
```

### Snags

* Shallow render tests - type.displayName works for most react-bootstrap types but Input needs type.name


### TODOs

  + Check test coverage
  * Merge in server to repository and rename - use as file server?
  + Check ={ true }s
  + Broadcast tests?
  + Avoid any's
  + Sort out how to make /dist files (not in gitignore)
  + Are we immutable enough?
  + Add jsdoc comments
  + Restore conditional imports for Root and configureStore (and fix hot modules reloading in configure store)
  + Why errors from atom's lint?
  + Stardardize debugger lines
  + Reducer hotloader in configureStore
  + Any way to test onSubmit?
  + Better JSX types in expect.d.ts
  + Avoid the as any for displayName
  * Production build - use uglify?
  * What if more than one person clicks setup?
