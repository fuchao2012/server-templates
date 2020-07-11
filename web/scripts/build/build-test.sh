#!/usr/bin/env bash
set -o errexit

# 当前路径
CURDIR=$(cd `dirname $0`; pwd)

# 定义常量
BRANCH=dev
if [ $# -gt 0 ]; then
    BRANCH="$1"
fi
# echo "[BRANCH] is: ${BRANCH}"

# 构建前端代码
node $CURDIR/build.js --target test

# #构建server端代码前，先将源码copy到临时目录 
# node $CURDIR/prebuild.js --target test
# # 构建server端代码 此为临时目录，由上一步产生
# tsc -P build/servertemp/tsconfig.json

# #组装代码
# node $CURDIR/pack.js --target test

# # 上传代码到git仓库和nos
# node $CURDIR/git.js --target test
