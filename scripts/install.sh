#!/bin/bash
set -o errexit

cd server && npm install && cd ..

cd web && npm install