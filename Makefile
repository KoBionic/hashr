DEPENDENCIES				:= cut date git npm sha256sum
$(foreach dependency, ${DEPENDENCIES}, $(if $(shell which ${dependency}),, $(error No ${dependency} in PATH)))

OUTPUT_DIR					:= dist
TAG							:= $(shell git describe --abbrev=0)
NEXT_VERSION_BASE			:= $(shell date +%y.%m)
VERSION_BASE				:= $(shell echo ${TAG} | cut -c1-5)
VERSION_PATCH				:= $(shell echo ${TAG} | cut -c7-)
SHELL						:= /bin/bash

ifeq (${VERSION_BASE}, ${NEXT_VERSION_BASE})
	NEXT_VERSION_PATCH		:= $(shell echo $$((${VERSION_PATCH} + 1)))
else
	NEXT_VERSION_PATCH		:= 0
endif

NEXT_VERSION				:= ${NEXT_VERSION_BASE}.${NEXT_VERSION_PATCH}

define generate_sha256sum
	@ \
	PREFIX=${1}; \
	SUFFIX=${2}; \
	BINARY=$$PREFIX\${TAG}$$SUFFIX; \
	OUTPUT=${OUTPUT_DIR}/$$BINARY; \
	SHASUM=$$(sha256sum "$$OUTPUT" | awk '{print $$1}'); \
	echo "$$SHASUM  $$BINARY" > "$$OUTPUT.sha256"; \
	echo ✔ successfully packaged [sha256: $$SHASUM] $$OUTPUT
endef

default: install

build:
	@npm run build

clean:
	@npm run clean

install:
	@npm install

lint:
	@npm run lint

package:
	@echo ➜ packaging v${TAG}
	@npm run package
	$(call generate_sha256sum,"HashR Setup ",".exe")
	$(call generate_sha256sum,"HashR_","_amd64.deb")
	$(call generate_sha256sum,"HashR_","_arm64.deb")
	$(call generate_sha256sum,"HashR-","-arm64.AppImage")
	$(call generate_sha256sum,"HashR-","-arm64.dmg")
	$(call generate_sha256sum,"HashR-","-arm64.tar.gz")
	$(call generate_sha256sum,"HashR-",".aarch64.rpm")
	$(call generate_sha256sum,"HashR-",".AppImage")
	$(call generate_sha256sum,"HashR-",".dmg")
	$(call generate_sha256sum,"HashR-",".tar.gz")
	$(call generate_sha256sum,"HashR-",".x86_64.rpm")

release: lint
	@echo -e "\n➜ creating release v${NEXT_VERSION}"
	@git checkout main
	@jq '.version="${NEXT_VERSION}"' package.json > _package.json
	@mv _package.json package.json
	@npm install --silent
	@git add package.json package-lock.json
	@git commit -m "chore: release v${NEXT_VERSION}"
	@git tag --annotate "${NEXT_VERSION}" --message "Release v${NEXT_VERSION}"
	@git push --follow-tags
	@echo ✔ successfully created release v${NEXT_VERSION}

test:
	@npm run test
