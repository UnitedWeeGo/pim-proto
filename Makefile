help:
	@echo 'make install dev'

fuse:
	cd packages/web && node fuse

webpack:
	cd packages/web && npm run webpack

# remove dist, -force -recursively even if it exists and is a folder
clean:
	rm -f -r dist/ && rm -f -r packages/web/.fusebox

dev:
	$(MAKE) clean && $(MAKE) fuse

copypastecd:
	@echo 'cd packages/web && yarn add && cd ../../'

install:
	cd packages/web && yarn install

.PHONY: dev
