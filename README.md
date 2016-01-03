# Movie voting app with React, Redux and Typescript

Simple multi-client cooperative voting application based loosely on the
[article](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
by
[Tero Parviainen](http://teropa.info/) [(@teropa)](https://twitter.com/teropa).
It uses

* React 0.14 (with ES6 class-style components)
* Redux 3.0 and react-redux 4.0
* Bootstrap 3.3 via React-bootstrap 0.28
* Socket.io 1.3

and is built with Typescript 1.7 and webpack (with hot loading). Testing is done with mocha,
[expect](https://github.com/mjackson/expect)
and istanbul.

## Design notes and choices

Single SPA that allows any client to be a vote host or participant. Extremely simple socket.io server connects the clients (which does not serve files)

UI design is modal with the app's state shared across the modes, so the reducer is sub-divided by mode rather than being treated as a tree of sub-states. This means there is no need to use selectors or reselect and the state is simple enough to manage immutability manually

## Typescript challenges

React and redux are not written with extensive static typing in mind. Typescript is used to add as much type-information as possible. Imperfections include:
* Stateless functional components not supported
* Typecast needed to handle the `connect()` call (in `App.tsx`)
* Typecast to `any` used in component tests to navigate the rendered output (which includes data not part of `Element`)
* Istanbul runs on the `.js` output, not the `.ts` directly which distorts the coverage metrics
* Had to write custom `.d.ts` files (in `src/myTypings`) which are likely not very robust nor fully general

## Running the application

To run locally in development mode, first download the code and build the client
```sh
git clone http://https://github.com/jw120/movie-vote
cd movie-vote
npm run build:dev
```
Then in a new terminal window start the server
```sh
npm run start
```
and open several client browser windows to http://127.0.0.1:8080/

## TODO

  + Clean test and screenshot
  + Add a test to probe hasOwnProperty in addToRootData
  + Add tests for selector functions
  + Do the selector functions serve any useful purpose?
  + Implement production build
  + Check test coverage and add tests
  + Share constants with server
  + Add jsdoc comments?
  + Find a way to avoid key errors from React code using atom's lint?
  + Check reducer hotloader code in configureStore
  + Find a way to test submit code
