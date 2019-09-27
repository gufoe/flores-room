#!/bin/bash

set -e

cd ui
	yarn build
	cd ..

acp $1
