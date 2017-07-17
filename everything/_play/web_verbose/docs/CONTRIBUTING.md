- import/export rules (react)
- styles
- quick - _ folder
- scripts all go in Makefile, not pkg json
- config files in build/config when possible, package.json when not
- folders (api)

# standards:
- follow the eslint rules
- use let if a variable changes, const if it stays the same, and var for default and safety in scoping
  - when in doubt, check https://babeljs.io/repl/
  - @NOTE: @example: https://goo.gl/TKplwq
- use emoji in the commits for searchable & scannable commits, if you are searching for an emoji by word add the word to the commits to find it later
- tell people what you're working on, and push your code every day, so you don't work on the same thing simultaneously without knowing it
- branches...


==================
|     build      |
==================

- [ ] open source the server runner

---------
|  apps  |
---------

# p1
- d4
- webapp
- ui
- lv
# p2
- nj
- ed
# p3
- tests
- composertest
- composer
- solver
- inlets


-----------
|  tests  |
-----------

- layoutverse
- [x] immutables
- cymatics
- the data modeler, the composer, <- idk about those
- multiverse-solver <- looks real messed up with tests _and_ specs, fixtures, lints, builds left right and center
- styleverse


-------------
|  scripts  |
-------------

script to cop over config files

build/
  index.js
    -> cli file
    -> new html & test running in     

/back -> delete
/back/server & solver -> package
fusebox for running easier devving in places as needed
d-l-l config
fliphub .reusable
- [x] server middleware split
- [x] cli running

==================
|   structure    |
==================

-----------
|  files  |
-----------
- naming lint

## pre-commit & post-commit
- move non-critical files to and from config file
travis, procfile, readme, npmrc, app.json, newrelic

-------------
|  monorepo  |
-------------

- group packages into packages, or modules when needed

==================
|     quality    |
==================

---------------------
|   documentation    |
---------------------

- docblocks
- link to guides


------------------
|   assertions    |
------------------

- lint assertions
- lint improvements
- code test coverage tools
- build script building assertions on output


-------------------
|  collaboration  |
-------------------

- code collab rules
  - changelog
  - commits
  - reporting (every X time just to let everyone know what you __will__ be working on)

------------------
|  benchmarking  |
------------------

- benchmark
  - define what to benchmark
  - show improvements overtime
  - collab help improving the reporting to show over-time progress
  - deopt testing at intervals, add a badger



## Introduction
build:
- bundle: webpack &| fuse-box
- transpile: babel &| typescript
- lerna if needed

deployment:
- docker
- heroku
- aws
- travis
- github
- uglifyjs
- makefile

shared utils:
- date-fns
- chain-able
- lodash
- uuid
- autolinker if needed
- mixpanel if needed
- validators as needed

nodejs:
- routing: express | koa
- debugging: fliplog
- typescript if it's more understandable

front-end:
- view: preact | inferno,
- state:
	- mobx, local-storage
- api
	- frisbee
	- service-worker loaders if needed
- routing:
	- react-router
	- history
	- query-string, form-data
	- history-api-fallback
- styles:
	(so you can target all browsers like ie8+ so you don't have to write old css
	automatically removes unused css, gives warnings,
	autoprefixes, transforms newer syntax like css grids & flexbox,
	lets you use modules & variables)
	- postcss
	- cssnano

iteration & maintainability:
- eslint | tslint, prettier (autofix code, prevent errors)
- gitbooks, doxdox, editorconfig
- precommit hooks - so every commit rules are enforced

perf:
- benchmarks (carefully, often misleading)
- ssr
- common bad practice fixes (new es7 syntaxes that compile slow, argument mutations, scope leaking, common deopts, not-easily-optimizable fns, etc)
- optimizejs

tests:
- Fixtures (mock / example data) (jest | ava)
- Front-end Data Store Tests (jest | ava)
- Unit tests on the backend routing & API (supertest)
- UI tests for asserting rendered content (enzyme, jsdom)
- Integration tests: simulating actions on the UI and asserting results in the UI (testcafe)
- coveralls | codecov.io, nyc/istanbul if needed

misc:
- flow, ts
- babel, webpack, fusebox
- async/await, js scope, es6, es7
- fetch api
- react router
- webworkers, serviceworkers, sharedworkers
- expressjs
- jest/ava/mocha/chai/karma/jsdom


# Design Principles

These principles might be clear for everyone of us, but lets agree on those and take the following list as a quick refresher:

- **KISS ([Keep It Simple, Stupid](https://en.wikipedia.org/wiki/KISS_principle))**, most systems work best if they are kept simple rather than making them complex; therefore simplicity should be a key goal in design and unnecessary complexity should be avoided


- **DRY ([Don’t Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself))**,  every piece of knowledge must have a single, unambiguous, authoritative representation within a system.  In other words, you must try to maintain the behavior of a functionality of the system in a single piece of code.


- **YAGNI ([You Aren’t Gonna Need It](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it))**, don't boil the ocean, do the simplest thing that could possibly work


- **SRP ([Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle))**, a class should have only a single responsibility (i.e. only one potential change in the software's specification should be able to affect the specification of the class)


- **OCP ([Open/closed principle](https://en.wikipedia.org/wiki/Open/closed_principle))**, software entities … should be open for extension, but closed for modification.


- **LSP ([Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)**, objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.


- **ISP ([Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle))**, many client-specific interfaces are better than one general-purpose interface. No client should be forced to depend on methods it does not use.


- **DIP ([Dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle))**, one should “Depend upon Abstractions. Do not depend upon concretions.
