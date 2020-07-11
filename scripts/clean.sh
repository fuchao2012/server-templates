#!/bin/bash
set -o errexit

cd server && npm run clean && cd ..

cd web && npm run clean
