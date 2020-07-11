#!/usr/bin/env bash
set -o errexit

# 当前路径
CURDIR=$(cd `dirname $0`; pwd)

# 构建代码
node ${CURDIR}/build.js --target dev

# #构建server端代码前，先将源码copy到临时目录 
# node $CURDIR/prebuild.js --target dev

# # 构建server端代码 此为临时目录，由上一步产生
# tsc -P build/servertemp/tsconfig.json

# #组装代码
# node $CURDIR/pack.js --target dev
