#!/bin/sh

REPO_ROOT_DIR=$(git rev-parse --show-toplevel)

"${REPO_ROOT_DIR}"/tools/build/execute-composer.sh "install --optimize-autoloader"
