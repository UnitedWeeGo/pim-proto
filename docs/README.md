- scripts in makefile
- configs in package json when possible to reduce file clutter
- gifs to hide files and focus on important ones for each editor
- a general approach
- things to remember: each package can have subpackages when needed, bad to go much deeper rather than expand horizontally
- each package usable on their own (aside from ones crafted for that specific problem) and only can benefit from shared resources and ease of access
- put a copy of emoji commits in :3


files:

- editorconfig:
  - configs that work in all editors, shared tweaks to smoothen some differences and maintain consistency
  - lint (eslint, sass)
