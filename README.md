
TODO

* Better type for React Component?

* 1. reducers - DONE
* 2. components/react:

  + Get first component on screen - DONE
  + Stateless functional components - DONE
  + get components React-bootstrapped - DONE
  + tests for components? - DONE
  + Add callbacks and connect states

    * Signin - onClicks (with Form) done, TODO - sending 1x remote
    * Winner - onClicks done, TODO - sending 1x remote
    * Setup - TODO 3x onClicks (with Form) <-- NEXT #4
    * Monitor - onClicks done, TODO - sending 1x remote
    * Voting - onClicks done. TODO - sending of 2x remotes

  Add redux-devtools?

* 3. server and sockets

* Fix typing for Winner()

* tests for callbacks?
* Check propTypes does something (change a type and see warning? In tests?)
* Check import consistency - don't use defaults? what to use for React?
* What is the significance of button types (submit etc?)
* Can we unify winner and signin
* Protect vs multiple votes (or allow them)
* What if more than one person clicks setup?

# Note

* Shallow render tests - type.displayName works for most react-bootstrap types but Input needs type.name



# Design

Basic choices

* Cooperative voting - no authentication
* Client-side SPA for hosting and participating
* Very light server just to just re-broadcast messages

To consider

* What to send back and forth to server
* Auto next when everyone has voted?
* Send whole state to host, only pieces to voters?

Questions

* Do we need a server? Or just to handle the socket setup?
* How to handle syncing with socket-io? Track logins? Re-sync?

## Concept

Screen with 4 windows all in the same vote, one hosting, 3 others voting. Single server updating via socket-io

## UI screens

* ClientSignIn - everyone starts here
* ClientVoting - main screen for everyone except host
* HostSetup - initial screen for whoever volunteers to host
* HostMonitor - main screen for host
* AllWinner - final screen for all

## Props and actions for each screen

### ClientSignIn

* Props - name of host
* Actions - joinVote, startHostSetup

### ClientVote

* Props - movieA, moviaB, round
* Action - vote

### HostSetup

* Props - entries
* Actions - addEntry, deleteEntry, next

### HostMonitor

* Props - movieA, movieB, scoreA, scoreB, entries
* Action - next

### AllWinner

* Props - winner
* Action - joinVote, offerToHost

## Client state

* MyName
* HostName
* MovieA, MovieB
* Round
* Winner
* ScoreA, ScoreB (host only)
* Entries (host only)<

## Server state

* HostName
* VoterNames
* As above

## Client actions

* joinVote(myName, hostName)
* offerToHost(myName)
* vote(movie)
* Host - next

## Server design

* Just echo any message received
