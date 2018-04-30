#!/bin/bash

COMPOSER_CMD=$*
COMPOSER_NAMES=("composer.phar" "composer")

for name in ${COMPOSER_NAMES[@]}
do
    COMPOSER_PATH=$(which $name)
    STATUS=$?
    if [ $STATUS -eq 0 ] && [ -x $COMPOSER_PATH ]; then
        echo "Composer found in: $COMPOSER_PATH"
        $COMPOSER_PATH $COMPOSER_CMD
        break
    fi
done

if [ -z $COMPOSER_PATH ]; then
    echo "WARNING: Composer NOT found"
fi
