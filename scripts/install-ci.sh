#!/bin/bash
set -o errexit

cd server && npm install --registry http://npm.hz.infra.mail/registry/ --unsafe-perm=true --allow-root && cd ..
cd web && npm install --registry http://npm.hz.infra.mail/registry/ --unsafe-perm=true --allow-root
