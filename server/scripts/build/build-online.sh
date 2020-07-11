#!/usr/bin/env bash
set -o errexit

# 当前路径
CURDIR=$(cd `dirname $0`; pwd)

SRCDIR=${CURDIR}/../..

# rm
rm -rf ${SRCDIR}/dist
rm -rf ${SRCDIR}/build

node ${CURDIR}/prebuild.js --target online

# 编译
tsc -P ${SRCDIR}/tsconfig.json

# 生成swagger.json
ts-node ${CURDIR}/buildswagger.ts

rm -rf ${SRCDIR}/dist/src 
cp -rf ${SRCDIR}/views ${SRCDIR}/dist/build/views
cp -rf ${SRCDIR}/build/src/swagger ${SRCDIR}/dist/build/src/swagger
mv ${SRCDIR}/dist/build/src ${SRCDIR}/dist/src
rm -rf ${SRCDIR}/dist/build/
rm -rf ${SRCDIR}/dist/scripts
rm -rf ${SRCDIR}/dist/test
rm -rf ${SRCDIR}/build/
