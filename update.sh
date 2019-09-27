#!/bin/bash

set -e

cd ui
	yarn build
	cd ..

acp $1
sleep 2

ssh -p 65002 u267856734@194.59.164.22 \
	cd repo && \
	git pull && \
	composer install && \
	php artisan migrate --force && \
	echo 'Update completed successfully'
