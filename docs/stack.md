
links/refs/more
cool md to site output

*HUB*


- [ ] wallaby, tower
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
