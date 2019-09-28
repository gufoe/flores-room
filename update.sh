#!/bin/bash

set -e

acp $1


echo Connecting to remote server...

ssh -p 65002 u267856734@194.59.164.22 '\
	cd repo && \
	git pull && \
	composer install && \
	php artisan migrate --force && \
	echo Update completed successfully '
