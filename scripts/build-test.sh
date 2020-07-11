#!/bin/bash
set -o errexit

# 编译前端
npm run web:build:test
# 编译后端
npm run server:build:test
# 清空dist目录
rm -rf dist
mkdir -p dist
# 拷贝 opera 部署需要的环境变量
cp deploy/env/setenv_test.sh dist/setenv.sh 
# 拷贝后端的结果到文件夹
cp -rf server/dist/* dist
# 拷贝前端的结果到文件夹
mkdir -p dist/web && cp -rf web/build/app dist/web
mkdir -p dist/mimg && cp -rf web/build/mimg dist

# 拷贝对应的package.json到dist目录
cp server/package.json dist
# PM2的文件
cp server/process.json dist
# 只安装生产环境需要的依赖
cd dist && npm install --production --registry http://npm.hz.infra.mail/registry/